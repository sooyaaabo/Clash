// 参考配置：https://raw.githubusercontent.com/Repcz/Tool/X/Clash/Meta/Override.js
// Clash Verge Rev (Version ≥ 17.2) & Mihomo-Party (Version ≥ 0.5.8)
// 最后更新时间: 2024-09-05 09:30

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "text",
  "interval": 86400
};

// 策略组通用配置
const groupBaseOption = {
  "interval": 300,
  "url": "http://www.apple.com/library/test/success.html",
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
    "fake-ip-filter": ["*", "+.lan", "+.local", "+.direct", "+.msftconnecttest.com", "+.msftncsi.com"],
    "default-nameserver": ["system"],
    "nameserver": ["223.5.5.5", "119.29.29.29", "180.184.1.1"],
    "nameserver-policy": {
      "geosite:cn": "system",
      "geosite:gfw,geolocation-!cn": ["quic://223.5.5.5", "quic://223.6.6.6", "https://1.12.12.12/dns-query", "https://120.53.53.53/dns-query"]
    }
  };

  // 覆盖 geodata 配置
  config["geodata-mode"] = true;
  config["geox-url"] = {
    "geoip": "https://raw.githubusercontent.com/Loyalsoldier/v2ray-rules-dat/release/geoip.dat",
    "geosite": "https://raw.githubusercontent.com/Loyalsoldier/v2ray-rules-dat/release/geosite.dat",
    "mmdb": "https://gitlab.com/Masaiki/GeoIP2-CN/-/raw/release/Country.mmdb",
    "asn": "https://gitlab.com/Loon0x00/loon_data/-/raw/main/geo/GeoLite2-ASN.mmdb"
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
    "dns-hijack": ["any:53"]
  };

  // 覆盖策略组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "手动切换",
      "type": "select",
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/ClashMeta-01.png"
    },
    {
      ...groupBaseOption,
      "name": "国外网站",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "新加坡节点", "日本节点", "韩国节点", "台湾节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Global.png"
    },
    {
      ...groupBaseOption,
      "name": "国际媒体",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "新加坡节点", "日本节点", "韩国节点", "台湾节点"],
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/YouTube.png"
    },
    {
      ...groupBaseOption,
      "name": "Apple",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "新加坡节点", "日本节点", "韩国节点", "台湾节点", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Apple.png"
    },
    {
      ...groupBaseOption,
      "name": "Microsoft",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "新加坡节点", "日本节点", "韩国节点", "台湾节点", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Microsoft.png"
    },
    {
      ...groupBaseOption,
      "name": "Google",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "新加坡节点", "日本节点", "韩国节点", "台湾节点"],
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Google.png"
    },
    {
      ...groupBaseOption,
      "name": "Telegram",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "新加坡节点", "日本节点", "韩国节点", "台湾节点"],
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Telegram-02.png"
    },
    {
      ...groupBaseOption,
      "name": "Twitter",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "新加坡节点", "日本节点", "韩国节点", "台湾节点"],
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/X-02.png"
    },
    {
      ...groupBaseOption,
      "name": "AI",
      "type": "select",
      "include-all": true,
      "proxies": ["手动切换", "香港节点", "美国节点", "新加坡节点", "日本节点", "韩国节点", "台湾节点"],
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/ChatGPT.png"
    },
    {
      ...groupBaseOption,
      "name": "Game",
      "type": "select",
      "include-all": true,
      "proxies": ["手动切换", "香港节点", "美国节点", "新加坡节点", "日本节点", "韩国节点", "台湾节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Game.png"
    },
    {
      ...groupBaseOption,
      "name": "Emby",
      "type": "select",
      "include-all": true,
      "proxies": ["手动切换", "香港节点", "美国节点", "新加坡节点", "日本节点", "韩国节点", "台湾节点"],
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Emby-02.png"
    },
    {
      ...groupBaseOption,
      "name": "广告拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Advertising.png"
    },
    {
      ...groupBaseOption,
      "name": "兜底分流",
      "type": "select",
      "proxies": ["手动切换", "香港节点", "美国节点", "新加坡节点", "日本节点", "韩国节点", "台湾节点", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Final.png"
    },
    // 地区分组
    {
      ...groupBaseOption,
      "name": "香港节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇭🇰|香港|(\b(HK|Hong)\b)",
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Flag/HongKong.png"
    },
    {
      ...groupBaseOption,
      "name": "美国节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇺🇸|美国|洛杉矶|圣何塞|(\b(US|United States)\b)",
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Flag/UnitedStates.png"
    },
    {
      ...groupBaseOption,
      "name": "新加坡节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)",
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Flag/Singapore.png"
    },
    {
      ...groupBaseOption,
      "name": "日本节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇯🇵|日本|东京|(\b(JP|Japan)\b)",
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Flag/Japan.png"
    },
    {
      ...groupBaseOption,
      "name": "韩国节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇰🇷|韩国|韓|首尔|(\b(KR|Korea)\b)",
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Flag/SouthKorea.png"
    },
    {
      ...groupBaseOption,
      "name": "台湾节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇨🇳|🇹🇼|台湾|(\b(TW|Tai|Taiwan)\b)",
      "icon": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Icon/Flag/Taiwan.png"
    }
  ];

  // 覆盖规则集
  config["rule-providers"] = {
    "AD": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Reject.list",
      "path": "./rules/AD.list"
    },
    "Apple": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Apple.list",
      "path": "./rules/Apple.list"
    },
    "Google": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Google.list",
      "path": "./rules/Google.list"
    },
    "YouTube": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/YouTube.list",
      "path": "./rules/YouTube.list"
    },
    "Telegram": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Telegram.list",
      "path": "./rules/Telegram.list"
    },
    "Twitter": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Twitter.list",
      "path": "./rules/Twitter.list"
    },
    "Steam": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Steam.list",
      "path": "./rules/Steam.list"
    },
    "Epic": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Epic.list",
      "path": "./rules/Epic.list"
    },
    "AI": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/AI.list",
      "path": "./rules/AI.list"
    },
    "Player-Proxy": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Rule/Player-Proxy.list",
      "path": "./rules/Player-Proxy.list"
    },
    "Player-Direct": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/sooyaaabo/Loon/main/Rule/Player-Direct.list",
      "path": "./rules/Player-Direct.list"
    },
    "Spotify": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Spotify.list",
      "path": "./rules/Spotify.list"
    },
    "Bahamut": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Bahamut.list",
      "path": "./rules/Bahamut.list"
    },
    "Netflix": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Netflix.list",
      "path": "./rules/Netflix.list"
    },
    "Disney": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Disney.list",
      "path": "./rules/Disney.list"
    },
    "PrimeVideo": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/PrimeVideo.list",
      "path": "./rules/PrimeVideo.list"
    },
    "HBO": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/HBO.list",
      "path": "./rules/HBO.list"
    },
    "OneDrive": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/OneDrive.list",
      "path": "./rules/OneDrive.list"
    },
    "Github": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Github.list",
      "path": "./rules/Github.list"
    },
    "Microsoft": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Microsoft.list",
      "path": "./rules/Microsoft.list"
    },
    "Lan": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Lan.list",
      "path": "./rules/Lan.list"
    },
    "ProxyGFW": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ProxyGFW.list",
      "path": "./rules/ProxyGFW.list"
    },
    "China": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ChinaDomain.list",
      "path": "./rules/China.list"
    }
  };

  // 覆盖规则
  config["rules"] = [
    "RULE-SET,AD,广告拦截",
    "RULE-SET,AI,AI",
    "RULE-SET,Apple,Apple",
    "RULE-SET,YouTube,Google",
    "RULE-SET,Google,Google",
    "RULE-SET,Telegram,Telegram",
    "RULE-SET,Twitter,Twitter",
    "RULE-SET,Steam,Game",
    "RULE-SET,Epic,Game",
    "RULE-SET,Player-Direct,DIRECT",
    "RULE-SET,Player-Proxy,Emby",
    "RULE-SET,Spotify,国际媒体",
    "RULE-SET,Bahamut,国际媒体",
    "RULE-SET,Netflix,国际媒体",
    "RULE-SET,Disney,国际媒体",
    "RULE-SET,PrimeVideo,国际媒体",
    "RULE-SET,HBO,国际媒体",
    "GEOSITE,onedrive,Microsoft",
    "GEOSITE,github,Microsoft",
    "GEOSITE,microsoft,Microsoft",
    "GEOSITE,gfw,国外网站",
    "RULE-SET,China,DIRECT",
    "GEOIP,lan,DIRECT",
    "GEOIP,CN,DIRECT",
    "MATCH,兜底分流"
  ];

  // 返回修改后的配置
  return config;
}