## hierarchyNavigate

> This document was translated by Google Translate without manual checking. The author cannot guarantee the accuracy of the translation results. And this document does not express the author's attitude or position.

> Current Version：v0.1.1 New: Set item configuration; Improved: Default style;Fixed: wrongly display after quickly switching tab; Fixed: Option 'transfer reference' cannot be displayed.

Add parent and children documents links under the document title.

### Quick Start

- Just turn on the plugin;
- For more information, please refer to the plugin setting page (named "文档上下层级导航");

#### Other explanation

- Maybe available in siyuan Android App (in testing);

- After inserting the navigation part, the document icon on the left side of the title will have some misalignment, which can be solved by "Settings - Appearance - Code Snippet - Add css"

  ```css
  .protyle-title__icon {
      top: 40px;
  }
  ```

  

## Feedback bugs

Please go to [github repository](https://github.com/OpaqueGlass/syplugin-my-plugin-collection) to report problems.

### Reference & Thanks

| Developer/Project                                            | Description                                                  | Illustration                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [UFDXD](https://github.com/UFDXD)/[HBuilderX-Light](https://github.com/UFDXD/HBuilderX-Light) | A borderless eye protection theme                            | This plug-in is implemented by referring to the parent-child document information under its title |
| [leolee9086](https://github.com/leolee9086) / [cc-template](https://github.com/leolee9086/cc-template) | Render template in widget; [Mulan Permissive Software License，Version 2](https://github.com/leolee9086/cc-template/blob/main/LICENSE) | Click to open the doc.                                       |
| [zuoez02]([zuoez02 (Luto Yvan) (github.com)](https://github.com/zuoez02))/[siyuan-plugin-system](https://github.com/zuoez02/siyuan-plugin-system) | A plugin system for siyuan                                   |                                                              |
| [zxhd863943427](https://github.com/zxhd863943427)&[mozhux (赐我一胖) (github.com)](https://github.com/mozhux) |                                                              | Style suggestions and contributions.                         |

