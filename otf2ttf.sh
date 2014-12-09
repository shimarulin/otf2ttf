#!/usr/local/bin/fontforge
Open($1);
fontFile = $fontname+".ttf";
Print('{');
Print('    "fontSourceFile":    "' + $1 + '",');
Print('    "fontName":    "' + $fontname + '",');
Print('    "familyName":  "' + $familyname + '",');
Print('    "fullName":    "' + $fullname + '",');
Print('    "fontVersion": "' + $fontversion + '",');
Print('    "fontFile": "' + fontFile + '",');
Print('    "fontPath": "' + $2 + '",');
Print('    "copyright":   "' + $copyright + '"');
Print('}');

#Generate($1:h+"/"+$fontname+".ttf");
Generate($2+"/"+fontFile);
Quit(0);
