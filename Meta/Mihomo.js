function main(config) {
    config["proxy-groups"] = [
        {
            icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Orz-3/mini/master/Color/Static.png",
            "include-all": true,
            "exclude-filter":
                "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            name: "PROXY",
            type: "select",
            proxies: ["AUTO", "HK AUTO", "SG AUTO", "JP AUTO", "US AUTO"],
        },
        {
            icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Orz-3/mini/master/Color/Urltest.png",
            "include-all": true,
            "exclude-filter":
                "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            name: "AUTO",
            type: "url-test",
            interval: 300,
        },
        {
            icon: "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/ChatGPT.png",
            name: "AI",
            type: "select",
            proxies: ["SG AUTO", "JP AUTO", "US AUTO"],
        },
        {
            icon: "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Telegram.png",
            name: "Telegram",
            type: "select",
            proxies: ["HK AUTO", "SG AUTO", "JP AUTO", "US AUTO"],
        },
        {
            icon: "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Global.png",
            name: "Google",
            type: "select",
            proxies: ["HK AUTO", "SG AUTO", "JP AUTO", "US AUTO"],
        },
        {
            icon: "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Flag/HongKong.png",
            "include-all": true,
            "exclude-filter":
                "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            filter: "(?i)香港|Hong Kong|HK|🇭🇰",
            name: "HK AUTO",
            type: "url-test",
            interval: 300,
        },
        {
            icon: "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Flag/Singapore.pngg",
            "include-all": true,
            "exclude-filter":
                "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            filter: "(?i)新加坡|Singapore|🇸🇬",
            name: "SG AUTO",
            type: "url-test",
            interval: 300,
        },
        {
            icon: "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Flag/Japan.png",
            "include-all": true,
            "exclude-filter":
                "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            filter: "(?i)日本|Japan|🇯🇵",
            name: "JP AUTO",
            type: "url-test",
            interval: 300,
        },
        {
            icon: "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Flag/UnitedStates.png",
            "include-all": true,
            "exclude-filter":
                "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            filter: "(?i)美国|USA|🇺🇸",
            name: "US AUTO",
            type: "url-test",
            interval: 300,
        },
    ];
    if (!config['rule-providers']) {
        config['rule-providers'] = {};
    }
    config["rule-providers"] = Object.assign(config["rule-providers"], {
        private: {
            url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.yaml",
            path: "./ruleset/private.yaml",
            behavior: "domain",
            interval: 86400,
            format: "yaml",
            type: "http",
        },
        cn_domain: {
            url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/cn.yaml",
            path: "./ruleset/cn_domain.yaml",
            behavior: "domain",
            interval: 86400,
            format: "yaml",
            type: "http",
        },
        telegram_domain: {
            url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/telegram.yaml",
            path: "./ruleset/telegram_domain.yaml",
            behavior: "domain",
            interval: 86400,
            format: "yaml",
            type: "http",
        },
        google_domain: {
            url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.yaml",
            path: "./ruleset/google_domain.yaml",
            behavior: "domain",
            interval: 86400,
            format: "yaml",
            type: "http",
        },
        "geolocation-!cn": {
            url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/geolocation-!cn.yaml",
            path: "./ruleset/geolocation-!cn.yaml",
            behavior: "domain",
            interval: 86400,
            format: "yaml",
            type: "http",
        },
        cn_ip: {
            url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/cn.yaml",
            path: "./ruleset/cn_ip.yaml",
            behavior: "ipcidr",
            interval: 86400,
            format: "yaml",
            type: "http",
        },
        telegram_ip: {
            url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/telegram.yaml",
            path: "./ruleset/telegram_ip.yaml",
            behavior: "ipcidr",
            interval: 86400,
            format: "yaml",
            type: "http",
        },
        google_ip: {
            url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/google.yaml",
            path: "./ruleset/google_ip.yaml",
            behavior: "ipcidr",
            interval: 86400,
            format: "yaml",
            type: "http",
        },
        bing: {
            url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Bing/Bing.yaml",
            path: "./ruleset/bing.yaml",
            behavior: "classical",
            interval: 86400,
            format: "yaml",
            type: "http",
        },
        copilot: {
            url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Copilot/Copilot.yaml",
            path: "./ruleset/copilot.yaml",
            behavior: "classical",
            interval: 86400,
            format: "yaml",
            type: "http",
        },
        claude: {
            url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Claude/Claude.yaml",
            path: "./ruleset/claude.yaml",
            behavior: "classical",
            interval: 86400,
            format: "yaml",
            type: "http",
        },
        bard: {
            url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BardAI/BardAI.yaml",
            path: "./ruleset/bard.yaml",
            behavior: "classical",
            interval: 86400,
            format: "yaml",
            type: "http",
        },
        openai: {
            url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OpenAI/OpenAI.yaml",
            path: "./ruleset/openai.yaml",
            behavior: "classical",
            interval: 86400,
            format: "yaml",
            type: "http",
        },
        steam: {
            url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Steam/Steam.yaml",
            path: "./ruleset/steam.yaml",
            behavior: "classical",
            interval: 86400,
            format: "yaml",
            type: "http",
        },
    });

    config["rules"] = [
        "RULE-SET,private,DIRECT",
        "RULE-SET,bing,AI",
        "RULE-SET,copilot,AI",
        "RULE-SET,bard,AI",
        "RULE-SET,openai,AI",
        "RULE-SET,claude,AI",
        "RULE-SET,steam,PROXY",
        "RULE-SET,telegram_domain,Telegram",
        "RULE-SET,telegram_ip,Telegram",
        "RULE-SET,google_domain,Google",
        "RULE-SET,google_ip,Google",
        "RULE-SET,geolocation-!cn,PROXY",
        "RULE-SET,cn_domain,DIRECT",
        "RULE-SET,cn_ip,DIRECT",
        "MATCH,PROXY",
    ];

    return config;
}