// Local storage keys
export const STORAGE_KEY_FILES = 'qwik-monaco-files';
export  const STORAGE_KEY_MAIN_FILE = 'qwik-monaco-main-file';
export const STORAGE_KEY_LANGUAGE = 'qwik-monaco-language';

// Default examples with imports for different languages
export  const DEFAULT_EXAMPLES = {
    javascript: {
        'index.js': 'import { greeting, sayGoodbye } from "./utils.js";\n\nconsole.log(greeting("World"));\nsayGoodbye();',
        'utils.js': 'export const greeting = (name) => {\n  return `Hello, ${name}!`;\n};\n\nexport function sayGoodbye() {\n  console.log("Goodbye!");\n}'
    },
    python: {
        'main.py': 'from utils import greet, say_goodbye\n\nprint(greet("World"))\nsay_goodbye()',
        'utils.py': 'def greet(name):\n    return f"Hello, {name}!"\n\ndef say_goodbye():\n    print("Goodbye!")'
    },
    go: {
        'main.go': 'package main\n\nimport (\n\t"fmt"\n\t"temp_module/utils"\n)\n\nfunc main() {\n\tfmt.Println(utils.Greet("World"))\n\tutils.SayGoodbye()\n}',
        'utils/utils.go': 'package utils\n\nimport "fmt"\n\nfunc Greet(name string) string {\n\treturn "Hello, " + name + "!"\n}\n\nfunc SayGoodbye() {\n\tfmt.Println("Goodbye!")\n}'
    }
};

// Special marker for empty folders
export const FOLDER_MARKER = '--FOLDER--';