export const lesson = `<div class="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 font-sans transition-colors duration-200">
<div class="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-8 py-4">
  <div class="flex items-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-500 flex-wrap">
    <span class="tex t-yellow-600 dark:text-yellow-400 font-semibold">C LANGUAGE</span>
    <i class="fas fa-chevron-right text-zinc-300 dark:text-zinc-700 text-xs"></i>
    <span>MODULE 1</span>
    <i class="fas fa-chevron-right text-zinc-300 dark:text-zinc-700 text-xs"></i>
    <span>CHAPTER 1</span>
    <i class="fas fa-chevron-right text-zinc-300 dark:text-zinc-700 text-xs"></i>
    <span class="text-yellow-600 dark:text-yellow-400">LESSON 1</span>
    <div class="ml-auto flex items-center gap-3">
      <span class="text-zinc-400 dark:text-zinc-600">1 / 16</span>
      <div class="w-24 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" style="width:6%"></div>
      </div>
    </div>
  </div>
</div>
<div class="px-8 pt-14 pb-10 border-b border-zinc-200 dark:border-zinc-800">
  <div class="max-w-3xl">
    <div class="flex items-center gap-3 mb-5">
      <div class="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-500/40 flex items-center justify-center">
        <i class="fas fa-terminal text-yellow-400 dark:text-yellow-400 text-lg"></i>
      </div>
      <div class="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
        C · Module 1 · Chapter 1 · Lesson 1
      </div>
    </div>
    <h1 class="text-5xl font-extrabold text-zinc-900 dark:text-white leading-tight mb-4">Introduction to C</h1>
    <p class="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">Discover the language that built Unix, Linux, and the modern software world — still essential after 50 years.</p>
  </div>
</div>
<div class="max-w-3xl mx-auto px-8 py-12">
<div class="mb-10">
  <h2 class="text-2xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
      <i class="fas fa-history text-yellow-400 dark:text-yellow-400 text-sm"></i>
    </span>What is C?
  </h2>
  <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4"><strong class="text-zinc-900 dark:text-white">C</strong> was created by <strong class="text-zinc-900 dark:text-white">Dennis Ritchie</strong> at Bell Labs between 1969 and 1973, primarily to rewrite the Unix operating system. It is a small, portable language that compiles directly to machine code and gives you fine-grained control over memory and hardware.</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
  <div class="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center mb-3">
    <i class="fas fa-linux text-yellow-400 dark:text-yellow-400"></i>
  </div>
  <h3 class="text-zinc-900 dark:text-white font-semibold mb-1">Operating Systems</h3>
  <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">Linux, Windows NT, and macOS kernels are written primarily in C.</p>
</div><div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
  <div class="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center mb-3">
    <i class="fas fa-microchip text-yellow-400 dark:text-yellow-400"></i>
  </div>
  <h3 class="text-zinc-900 dark:text-white font-semibold mb-1">Embedded Systems</h3>
  <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">Every Arduino, PLC, and microcontroller uses C as its primary language.</p>
</div><div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
  <div class="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center mb-3">
    <i class="fas fa-code text-yellow-400 dark:text-yellow-400"></i>
  </div>
  <h3 class="text-zinc-900 dark:text-white font-semibold mb-1">Language Runtimes</h3>
  <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">Python, Ruby, PHP, and Lua are all implemented in C.</p>
</div><div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
  <div class="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center mb-3">
    <i class="fas fa-database text-yellow-400 dark:text-yellow-400"></i>
  </div>
  <h3 class="text-zinc-900 dark:text-white font-semibold mb-1">Databases</h3>
  <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">MySQL, PostgreSQL, SQLite — all written in C for maximum performance.</p>
</div></div>
</div><div class="mb-10">
  <h2 class="text-2xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
      <i class="fas fa-terminal text-yellow-400 dark:text-yellow-400 text-sm"></i>
    </span>Hello World
  </h2>
  <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">The smallest complete C program:</p><pre class="bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 overflow-x-auto my-4"><code class="text-zinc-800 dark:text-zinc-200 font-mono text-sm leading-relaxed">#include &lt;stdio.h&gt;    /* include standard I/O header */

int main(void) {       /* entry point — every program needs this */
    printf("Hello, World!\n");  /* print to stdout */
    return 0;          /* 0 = success, non-zero = error */
}

/* Compile and run:
   gcc hello.c -o hello    &lt;-- compile
   ./hello                 &lt;-- run (Linux/Mac)
   hello.exe               &lt;-- run (Windows)
*/</code></pre><div class="space-y-3 mt-4"><div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 my-3">
  <p class="text-blue-700 dark:text-blue-300 font-mono text-xs font-semibold mb-1">#include <stdio.h></p>
  <p class="text-blue-600 dark:text-blue-400 text-sm leading-relaxed">Tells the preprocessor to copy in the standard I/O library declarations. stdio.h provides printf, scanf, fopen, and more.</p>
</div><div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 my-3">
  <p class="text-yellow-700 dark:text-yellow-300 font-mono text-xs font-semibold mb-1">int main(void)</p>
  <p class="text-yellow-600 dark:text-yellow-400 text-sm leading-relaxed">The program entry point. int is the return type. void means no arguments. The OS calls main() to start your program.</p>
</div><div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 my-3">
  <p class="text-green-700 dark:text-green-300 font-mono text-xs font-semibold mb-1">printf("Hello, World!\n")</p>
  <p class="text-green-600 dark:text-green-400 text-sm leading-relaxed">Prints to the terminal. \n is a newline. The format string can contain %d, %f, %s for substitutions.</p>
</div><div class="bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 my-3">
  <p class="text-zinc-700 dark:text-zinc-300 font-mono text-xs font-semibold mb-1">return 0;</p>
  <p class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">Returns a status code to the OS. 0 = success. Any other value signals an error. The shell can read this with $?.</p>
</div></div>
</div><div class="bg-green-50  dark:bg-green-400/10  border-green-400 border-l-4 rounded-r-xl p-4 my-5">
  <div class="flex items-center gap-2 mb-1">
    <i class="fas fa-shield-alt text-green-600  dark:text-green-400"></i>
    <span class="text-green-600  dark:text-green-400 font-semibold text-sm">Enable All Warnings</span>
  </div>
  <p class="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">Always compile with -Wall -Wextra flags. They enable all common warnings and catch bugs before you even run the program: gcc -Wall -Wextra hello.c -o hello</p>
</div><div class="mb-10">
  <h2 class="text-2xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
      <i class="fas fa-balance-scale text-yellow-400 dark:text-yellow-400 text-sm"></i>
    </span>C vs Modern Languages
  </h2>
  <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">Understanding what C does NOT have helps you appreciate why it is so fast and why it demands discipline:</p><div class="space-y-3"><div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 my-3">
  <p class="text-orange-700 dark:text-orange-300 font-mono text-xs font-semibold mb-1">No garbage collector</p>
  <p class="text-orange-600 dark:text-orange-400 text-sm leading-relaxed">You manage all heap memory manually. malloc() allocates, free() releases. A missed free() is a memory leak. A double-free is a crash.</p>
</div><div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 my-3">
  <p class="text-red-700 dark:text-red-300 font-mono text-xs font-semibold mb-1">No bounds checking</p>
  <p class="text-red-600 dark:text-red-400 text-sm leading-relaxed">Accessing arr[10] on a 5-element array is undefined behaviour. C trusts you. This enables speed — and bugs.</p>
</div><div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 my-3">
  <p class="text-orange-700 dark:text-orange-300 font-mono text-xs font-semibold mb-1">No exceptions</p>
  <p class="text-orange-600 dark:text-orange-400 text-sm leading-relaxed">Errors are signalled by return values and global errno. You check every function's return value explicitly.</p>
</div><div class="bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 my-3">
  <p class="text-zinc-700 dark:text-zinc-300 font-mono text-xs font-semibold mb-1">No classes or OOP</p>
  <p class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">C is purely procedural. You can simulate OOP with structs and function pointers, but there is no built-in concept.</p>
</div></div>
</div><div class="mb-10">
  <h2 class="text-2xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
      <i class="fas fa-history text-yellow-400 dark:text-yellow-400 text-sm"></i>
    </span>The C Standards
  </h2>
  <div class="space-y-3"><div class="bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 my-3">
  <p class="text-zinc-700 dark:text-zinc-300 font-mono text-xs font-semibold mb-1">C89 / ANSI C (1989)</p>
  <p class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">The original standard. All compilers support it. Requires variable declarations at the top of blocks.</p>
</div><div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 my-3">
  <p class="text-blue-700 dark:text-blue-300 font-mono text-xs font-semibold mb-1">C99 (1999)</p>
  <p class="text-blue-600 dark:text-blue-400 text-sm leading-relaxed">Added // comments, variable declarations anywhere, flexible array members, stdint.h, bool type, and much more.</p>
</div><div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 my-3">
  <p class="text-yellow-700 dark:text-yellow-300 font-mono text-xs font-semibold mb-1">C11 (2011)</p>
  <p class="text-yellow-600 dark:text-yellow-400 text-sm leading-relaxed">Added threads (_Thread), atomics, improved Unicode support, static assertions, and anonymous structs/unions.</p>
</div><div class="bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 my-3">
  <p class="text-zinc-700 dark:text-zinc-300 font-mono text-xs font-semibold mb-1">C17 (2018)</p>
  <p class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">Mostly a bug-fix release for C11. No major new features — increased compiler conformance.</p>
</div></div><div class="bg-yellow-50 dark:bg-yellow-400/10 border-yellow-400 border-l-4 rounded-r-xl p-4 my-5">
  <div class="flex items-center gap-2 mb-1">
    <i class="fas fa-star text-yellow-600 dark:text-yellow-400"></i>
    <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-sm">Recommended Standard</span>
  </div>
  <p class="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">Use gcc -std=c11 -Wall -Wextra for new projects. C11 has all the modern features while remaining simple and portable.</p>
</div>
</div><div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mt-10">
  <h2 class="text-xl font-bold text-zinc-900 dark:text-white mb-5 flex items-center gap-3">
    <i class="fas fa-flag-checkered text-yellow-400 dark:text-yellow-400"></i> Lesson Summary
  </h2>
  <ul class="space-y-3"><li class="flex items-start gap-3 text-zinc-700 dark:text-zinc-300 text-sm"><i class="fas fa-check-circle text-yellow-500 dark:text-yellow-400 mt-0.5 flex-shrink-0"></i><span>C was created in 1969-1973 to write the Unix OS — now it runs virtually every OS kernel</span></li><li class="flex items-start gap-3 text-zinc-700 dark:text-zinc-300 text-sm"><i class="fas fa-check-circle text-yellow-500 dark:text-yellow-400 mt-0.5 flex-shrink-0"></i><span>Programs compile directly to machine code — no VM, no interpreter, maximum speed</span></li><li class="flex items-start gap-3 text-zinc-700 dark:text-zinc-300 text-sm"><i class="fas fa-check-circle text-yellow-500 dark:text-yellow-400 mt-0.5 flex-shrink-0"></i><span>You manage all memory manually: malloc allocates, free releases, with no safety net</span></li><li class="flex items-start gap-3 text-zinc-700 dark:text-zinc-300 text-sm"><i class="fas fa-check-circle text-yellow-500 dark:text-yellow-400 mt-0.5 flex-shrink-0"></i><span>gcc hello.c -o hello compiles; ./hello runs the binary</span></li><li class="flex items-start gap-3 text-zinc-700 dark:text-zinc-300 text-sm"><i class="fas fa-check-circle text-yellow-500 dark:text-yellow-400 mt-0.5 flex-shrink-0"></i><span>Always use -Wall -Wextra flags to catch common mistakes at compile time</span></li><li class="flex items-start gap-3 text-zinc-700 dark:text-zinc-300 text-sm"><i class="fas fa-check-circle text-yellow-500 dark:text-yellow-400 mt-0.5 flex-shrink-0"></i><span>Use -std=c11 for modern C features while maintaining broad compatibility</span></li></ul>
</div>
</div>
</div>`;
