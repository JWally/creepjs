javascript-obfuscator voodoo.min.js --output voo.doo.min.js ^
    --options-preset default ^
    --simplify true ^
    --self-defending true ^
    & del voodoo.min.mjs ^
    & del voo.doo.min.mjs ^
    & rename voodoo.min.js voodoo.min.mjs ^
    & rename voo.doo.min.js voo.doo.min.mjs ^
    & copy .\voo.doo.min.mjs ..\keyri-voodoo\src\creepjs\voo.doo.min.mjs
    