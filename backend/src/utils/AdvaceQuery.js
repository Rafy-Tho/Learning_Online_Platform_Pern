import pgPool from "../configs/database.js";

class AdvancedQuery {
  constructor({ baseQuery, queryString, filterMap = {}, sortMap = {} }) {
    this.baseQuery = baseQuery;
    this.queryString = queryString;
    this.filterMap = filterMap;
    this.sortMap = sortMap;

    this.where = [];
    this.values = [];
    this.order = "";
    this.limit = "";
    this.offset = "";
    this.select = "*";
    this.pagination = {};
  }

  // =========================
  // 1️⃣ FILTER
  // =========================
  filter() {
    const excluded = ["page", "sort", "limit", "fields", "search"];
    const queryObj = { ...this.queryString };

    excluded.forEach((el) => delete queryObj[el]);

    Object.keys(queryObj).forEach((key) => {
      const baseField = key.split("[")[0];
      const column = this.filterMap[baseField];

      if (!column) return; // ignore unknown fields

      // operator (gte, lte, etc.)
      if (key.includes("[")) {
        const operator = key.match(/\[(.*)\]/)[1];

        const sqlOp = {
          gte: ">=",
          gt: ">",
          lte: "<=",
          lt: "<",
        }[operator];

        if (!sqlOp) return;

        this.values.push(queryObj[key]);
        this.where.push(`${column} ${sqlOp} $${this.values.length}`);
      } else {
        this.values.push(queryObj[key]);
        this.where.push(`${column} = $${this.values.length}`);
      }
    });

    return this;
  }

  // =========================
  // 2️⃣ SEARCH (MULTI FIELD)
  // =========================
  search(fields = []) {
    if (this.queryString.search && fields.length) {
      const value = `%${this.queryString.search}%`;

      const conditions = fields.map((field) => {
        this.values.push(value);
        return `${field} ILIKE $${this.values.length}`;
      });

      this.where.push(`(${conditions.join(" OR ")})`);
    }

    return this;
  }

  // =========================
  // 3️⃣ SORT
  // =========================
  sort() {
    if (this.queryString.sort) {
      const fields = this.queryString.sort
        .split(",")
        .map((f) => {
          const direction = f.startsWith("-") ? "DESC" : "ASC";
          const key = f.replace("-", "");

          const column = this.sortMap[key];
          if (!column) return null;

          return `${column} ${direction}`;
        })
        .filter(Boolean)
        .join(", ");

      if (fields) this.order = `ORDER BY ${fields}`;
    } else {
      // default sort
      if (this.sortMap.created_at) {
        this.order = `ORDER BY ${this.sortMap.created_at} DESC`;
      }
    }

    return this;
  }

  // =========================
  // 4️⃣ FIELD LIMITING
  // =========================
  limitFields() {
    if (this.queryString.fields) {
      this.select = this.queryString.fields
        .split(",")
        .map((f) => this.sortMap[f] || f)
        .join(", ");
    }
    return this;
  }

  // =========================
  // 5️⃣ PAGINATION
  // =========================
  async paginate() {
    const page = Math.max(1, Number(this.queryString.page) || 1);
    const limit = Math.max(1, Number(this.queryString.limit) || 10);
    const offset = (page - 1) * limit;

    const whereClause = this.where.length
      ? `WHERE ${this.where.join(" AND ")}`
      : "";

    // count query
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

  // =========================
  // 🔥 BUILD FINAL QUERY
  // =========================
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

    return {
      sql,
      values: this.values,
      pagination: this.pagination,
    };
  }
}

export default AdvancedQuery;
