import pgPool from "../configs/database.js";

class AdvancedQuery {
  constructor(baseQuery, queryString) {
    this.baseQuery = baseQuery; // "FROM courses c"
    this.queryString = queryString;
    this.where = [];
    this.values = [];
    this.order = "";
    this.limit = "";
    this.offset = "";
    this.select = "*";
    this.pagination = {};
  }

  // 1️⃣ Filtering
  filter() {
    const excluded = ["page", "sort", "limit", "fields", "search"];
    const queryObj = { ...this.queryString };

    excluded.forEach((el) => delete queryObj[el]);

    Object.keys(queryObj).forEach((key) => {
      if (key.includes("[")) {
        // price[gte]=10
        const field = key.split("[")[0];
        const operator = key.match(/\[(.*)\]/)[1];

        const sqlOp = {
          gte: ">=",
          gt: ">",
          lte: "<=",
          lt: "<",
        }[operator];

        this.values.push(queryObj[key]);
        this.where.push(`${field} ${sqlOp} $${this.values.length}`);
      } else {
        this.values.push(queryObj[key]);
        this.where.push(`${key} = $${this.values.length}`);
      }
    });

    return this;
  }

  // 2️⃣ Search
  search(field) {
    if (this.queryString.search) {
      this.values.push(`%${this.queryString.search}%`);
      this.where.push(`${field} ILIKE $${this.values.length}`);
    }
    return this;
  }

  // 3️⃣ Sorting
  sort() {
    if (this.queryString.sort) {
      const fields = this.queryString.sort
        .split(",")
        .map((f) => (f.startsWith("-") ? `${f.slice(1)} DESC` : `${f} ASC`))
        .join(", ");

      this.order = `ORDER BY ${fields}`;
    } else {
      this.order = `ORDER BY created_at DESC`;
    }

    return this;
  }

  // 4️⃣ Field limiting
  limitFields() {
    if (this.queryString.fields) {
      this.select = this.queryString.fields.split(",").join(", ");
    }
    return this;
  }

  // 5️⃣ Pagination
  async paginate() {
    const page = Math.max(1, Number(this.queryString.page) || 1);
    const limit = Math.max(1, Number(this.queryString.limit) || 10);
    const offset = (page - 1) * limit;

    // count total
    const whereClause = this.where.length
      ? `WHERE ${this.where.join(" AND ")}`
      : "";

    const countQuery = `SELECT COUNT(*) ${this.baseQuery} ${whereClause}`;
    const countResult = await pgPool.query(countQuery, this.values);

    const total = Number(countResult.rows[0].count);

    this.pagination = {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      limit,
    };

    if (page * limit < total) this.pagination.next = page + 1;
    if (page > 1) this.pagination.prev = page - 1;

    this.limit = `LIMIT ${limit}`;
    this.offset = `OFFSET ${offset}`;

    return this;
  }

  // 🔥 Build final query
  build() {
    const whereClause = this.where.length
      ? `WHERE ${this.where.join(" AND ")}`
      : "";

    const sql = `
      SELECT ${this.select}
      ${this.baseQuery}
      ${whereClause}
      ${this.order}
      ${this.limit}
      ${this.offset}
    `;

    return { sql, values: this.values, pagination: this.pagination };
  }
}

export default AdvancedQuery;
