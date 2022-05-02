# Random Password Generator in JavaScript

This is a password generator that generates random passwords.
The resulting passwords don't make any sense, but they are random
(and thus, **very** secure).
You can specify a **lot** of different parameters to modify the
way the program generates passwords in the <code>settings.jsonc</code> file.

The settings file should be located in the same directory as the program, and it can alter these parameters:

- **The characters to use in the password**: specify the <code>chars</code> key. The value of this key is a string of characters to use.
- **Booting to verbose mode or not**: specify the <code>verboseMode</code> key. The value of this key is a boolean; if it is true, then the program enters verbose mode, otherwise, well, it doesn't.
- **The password's length**: specify the <code>passwordLength</code> key. The value of this key is an integer; the length of the password.
- **Entering an infinite loop or not**: specify the <code>infiniteLoop</code> key. The value of this key is a boolean; if it is true, then the program enters an infinite loop, otherwise, well, it doesn't.
## Usage
Once you clone the repo, test the program by running <code>npm run test</code> from the command line in the directory where you cloned the repo. This will run the program and print the results.
If everything is working, you can now specify these flags on the command line or set the proper keys in the <code>settings.jsonc</code> file:

- <code>-h</code> or <code>--help</code>: Show a help message.
- <code>-a</code> or <code>--about</code>: Show about message.
- <code>--verbose</code>: Enable verbose mode.
- <code>-i</code> or <code>--infinite</code>: Enable infinite mode.
- <code>-v</code> or <code>--version</code>: Show version.