
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const snowballTheme: CustomThemeConfig = {
    name: 'snowball-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Roboto, sans-serif`,
		"--theme-font-family-heading": `Roboto, sans-serif`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "8px",
		"--theme-rounded-container": "0px",
		"--theme-border-base": "0px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "255 255 255",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "0 0 0",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #1AC0C0 
		"--color-primary-50": "221 246 246", // #ddf6f6
		"--color-primary-100": "209 242 242", // #d1f2f2
		"--color-primary-200": "198 239 239", // #c6efef
		"--color-primary-300": "163 230 230", // #a3e6e6
		"--color-primary-400": "95 211 211", // #5fd3d3
		"--color-primary-500": "26 192 192", // #1AC0C0
		"--color-primary-600": "23 173 173", // #17adad
		"--color-primary-700": "20 144 144", // #149090
		"--color-primary-800": "16 115 115", // #107373
		"--color-primary-900": "13 94 94", // #0d5e5e
		// secondary | #8DF18B 
		"--color-secondary-50": "238 253 238", // #eefdee
		"--color-secondary-100": "232 252 232", // #e8fce8
		"--color-secondary-200": "227 252 226", // #e3fce2
		"--color-secondary-300": "209 249 209", // #d1f9d1
		"--color-secondary-400": "175 245 174", // #aff5ae
		"--color-secondary-500": "141 241 139", // #8DF18B
		"--color-secondary-600": "127 217 125", // #7fd97d
		"--color-secondary-700": "106 181 104", // #6ab568
		"--color-secondary-800": "85 145 83", // #559153
		"--color-secondary-900": "69 118 68", // #457644
		// tertiary | #243545 
		"--color-tertiary-50": "222 225 227", // #dee1e3
		"--color-tertiary-100": "211 215 218", // #d3d7da
		"--color-tertiary-200": "200 205 209", // #c8cdd1
		"--color-tertiary-300": "167 174 181", // #a7aeb5
		"--color-tertiary-400": "102 114 125", // #66727d
		"--color-tertiary-500": "36 53 69", // #243545
		"--color-tertiary-600": "32 48 62", // #20303e
		"--color-tertiary-700": "27 40 52", // #1b2834
		"--color-tertiary-800": "22 32 41", // #162029
		"--color-tertiary-900": "18 26 34", // #121a22
		// success | #46E24C 
		"--color-success-50": "227 251 228", // #e3fbe4
		"--color-success-100": "218 249 219", // #daf9db
		"--color-success-200": "209 248 210", // #d1f8d2
		"--color-success-300": "181 243 183", // #b5f3b7
		"--color-success-400": "126 235 130", // #7eeb82
		"--color-success-500": "70 226 76", // #46E24C
		"--color-success-600": "63 203 68", // #3fcb44
		"--color-success-700": "53 170 57", // #35aa39
		"--color-success-800": "42 136 46", // #2a882e
		"--color-success-900": "34 111 37", // #226f25
		// warning | #EAB308 
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #FF6464 
		"--color-error-50": "255 232 232", // #ffe8e8
		"--color-error-100": "255 224 224", // #ffe0e0
		"--color-error-200": "255 216 216", // #ffd8d8
		"--color-error-300": "255 193 193", // #ffc1c1
		"--color-error-400": "255 147 147", // #ff9393
		"--color-error-500": "255 100 100", // #FF6464
		"--color-error-600": "230 90 90", // #e65a5a
		"--color-error-700": "191 75 75", // #bf4b4b
		"--color-error-800": "153 60 60", // #993c3c
		"--color-error-900": "125 49 49", // #7d3131
		// surface | #101D29 
		"--color-surface-50": "219 221 223", // #dbdddf
		"--color-surface-100": "207 210 212", // #cfd2d4
		"--color-surface-200": "195 199 202", // #c3c7ca
		"--color-surface-300": "159 165 169", // #9fa5a9
		"--color-surface-400": "88 97 105", // #586169
		"--color-surface-500": "16 29 41", // #101D29
		"--color-surface-600": "14 26 37", // #0e1a25
		"--color-surface-700": "12 22 31", // #0c161f
		"--color-surface-800": "10 17 25", // #0a1119
		"--color-surface-900": "8 14 20", // #080e14
	}
}