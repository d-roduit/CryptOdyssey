!!! DON'T REMOVE THE UNDERSCORE IN THE SASS FILES !!!

Sass files named with a leading underscore ( _ ) are called **partial** files.

Partial Sass files contain little snippets of CSS that you can include in other Sass files.
This is a great way to modularize your CSS and help keep things easier to maintain.

You might name it something like `_partial.scss`.
The underscore lets Sass know that the file is only a partial file and that it **should not** be generated into a CSS file.

Sass partials are used with the @use rule.

Each Sass file which is **not** named with a leading underscore is going to be compiled and written to its respective output folder.
