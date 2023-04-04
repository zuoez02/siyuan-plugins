(async function () {
    const curLang = window.parent?.siyuan?.config?.lang || 'en_US';
    const zh_CN = {
        LOADING: '加载中...',
        BAZZAR_EXIST: '集市版加载器已注册，终止',
        OLD_LOADER_EXIST: '发现其他插件系统加载器，将其自动关闭',
        GENRATE_NEW_SNIPPET: '创建新的加载器...',
        SUCCESS_INJECTED: '集市版加载器已成功注册',
    };

    const en_US = {
        LOADING: 'loading...',
        BAZZAR_EXIST: 'Plugin system bazzar loader already exist, terminated',
        OLD_LOADER_EXIST: 'Found plugin system loader exist, auto turn it off',
        GENRATE_NEW_SNIPPET: 'Generating new loader...',
        SUCCESS_INJECTED: 'set snippet success, new loader injected',
    };

    const langs = {
        zh_CN,
        en_US,
    };

    const lang = langs[curLang] || en_US;
    console.log(window.parent?.siyuan?.config?.lang, curLang, lang);

    const SNIPPET_NAME = 'DarkPlusConcise';
    const content = `(async () => {
        window.pluginSystemSource = 'bazzar';
        const response = await fetch('/api/file/getFile', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({ path: '/data/plugins/DarkPlusConcise/changeTheme.js' }),
        });
        const js = await response.text();
        eval(js);
    })()`;
    const request = async (url, body) => {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(body),
        });
        return response.json();
    }

    const res = await request('/api/snippet/getSnippet', { enabled: 2, type: 'all' });

    const snippets = res.data.snippets;

    const end = document.createElement('span');
    end.classList.add('end');
    document.body.appendChild(end);

    const showEnd = () => {
        document.body.removeChild(end);
        end.classList.add('blink');
        const p = document.createElement('p');
        p.appendChild(end);
        document.body.append(p);
    }

    const sleep = async (t) => {
        return new Promise((resolve) => setTimeout(() => resolve(), t));
    }

    const showMessage = async (message, type = 'p', speed = 24) => {
        document.body.removeChild(end);
        const chars = message.split('');
        const p = document.createElement(type);
        const content = document.createElement('span');
        content.innerHTML = '';
        p.appendChild(content);
        p.appendChild(end);
        document.body.insertAdjacentElement('beforeend', p);
        for (const i of chars) {
            content.innerHTML = content.innerHTML + i;
            window.scrollTo(0,document.body.scrollHeight);
            await sleep(speed);
        }
        await sleep(500);
        p.removeChild(end);
        document.body.appendChild(end);
    }

    // await showMessage(lang['LOADING']);

    for (const snippet of snippets) {
        if (snippet.type !== 'js') {
            continue;
        }
        // if (snippet.content.indexOf('https://gitee.com/zuoez02/siyuan-plugin-system/raw/main/main.js') !== -1) {
        //     await showMessage(lang['OLD_LOADER_EXIST']);
        //     await showMessage(snippet.content, 'pre', 10);
        //     snippet.enabled = false;
        // }
        if (snippet.name === SNIPPET_NAME) {
            snippet.enabled = true;
            snippet.content = content;
            await request('/api/snippet/setSnippet', { snippets });
            // await showMessage(lang['BAZZAR_EXIST']);
            // showEnd();
            return;
        }
    }
    // await showMessage(lang['GENRATE_NEW_SNIPPET']);
    
    // await showMessage(content, 'pre', 10);
    snippets.splice(0, 0, {
        id: '20230404170958-plugind',
        name: SNIPPET_NAME,
        type: 'js',
        enabled: true,
        content,
    });
    await request('/api/snippet/setSnippet', { snippets });
    // await showMessage(lang['SUCCESS_INJECTED']);
    // showEnd();
    setTimeout(() => window.parent.location.reload(), 1000);
})();