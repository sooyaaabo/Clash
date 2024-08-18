function main(config) {
  // 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "text",
  "interval": 86400
};

// 策略组通用配置
const groupBaseOption = {
  "interval": 300,
  "url": "http://latency-test.skk.moe/endpoint",
  "max-failed-times": 3,
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖通用配置
  config["mixed-port"] = "7890";
  config["tcp-concurrent"] = true;
  config["allow-lan"] = true;
  config["ipv6"] = false;
  config["log-level"] = "info";
  config["find-process-mode"] = "strict";
  config["global-client-fingerprint"] = "chrome";
  config["external-controller"] = "127.0.0.1:9090";
  config["external-ui"] = "ui";
  config["external-ui-url"] = "https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip";

  // 覆盖 dns 配置
  config["dns"] = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter":["+.lan", "*", "+.local"],
    "default-nameserver": ["223.5.5.5", "119.29.29.29", "system"],
    "nameserver": ["223.5.5.5", "119.29.29.29"],
    "nameserver-policy":{
      "geosite:cn": "system",
      "geosite:gfw": ["9.9.9.9", "149.112.112.112"],
      "geolocation-!cn": ["quic://223.5.5.5", "quic://223.6.6.6", "https://1.12.12.12/dns-query", "https://120.53.53.53/dns-query"]
    }
  };

  // 覆盖 geodata 配置
  config["geodata-mode"] = true;
  config["geox-url"] = {
    "geoip": "https://github.com/xream/geoip/releases/latest/download/ipinfo.geoip.dat",
    "geosite": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    "mmdb": "https://github.com/xream/geoip/releases/latest/download/ipinfo.country.mmdb",
    "asn": "https://github.com/xream/geoip/releases/latest/download/ipinfo.asn.mmdb"
  };

  // 覆盖 sniffer 配置
  config["sniffer"] = {
    "enable": true,
    "parse-pure-ip": true,
    "sniff": {
      "TLS": {
        "ports": ["443", "8443"]
      },
      "HTTP": {
        "ports": ["80", "8080-8880"],
        "override-destination": true
      },
      "QUIC": {
        "ports": ["443", "8443"]
      }
    }
  };

  // 覆盖 tun 配置
  config["tun"] = {
    "enable": true,
    "stack": "mixed",
    "dns-hijack": ["8.8.8.8:53","8.8.4.4:53"]
  };

  // 覆盖策略组
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
