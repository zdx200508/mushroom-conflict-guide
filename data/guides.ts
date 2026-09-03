export type GuideStep = { title: string; body: string };
export type LevelGuide = {
  level: number;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  steps: GuideStep[];
};

const guides: Record<number, LevelGuide> = {
  532: {
    level: 532,
    title: "第532关攻略",
    summary: "先稳住左下核心据点，再判断最强敌人，在多个势力之间寻找反击机会。",
    image: "/images/guides/mushroom-conflict-532.jpg",
    imageAlt: "蘑菇冲突第532关真实游戏截图",
    steps: [
      { title: "拿下左下建筑", body: "开局后先不要急着铺开战线，第一步是把左边最下方的那个建筑先变成自己的。" },
      { title: "把第一个据点升到 Max", body: "拿下之后不要急着占第二个，只专注连接这第一个建筑，让它成为你的核心据点，并优先升到 Max（满级）。" },
      { title: "判断最强敌人", body: "核心据点满级后，先分析当前战场形势。优先攻击发展最快、势头最猛、快要一家独大的敌人，防止它继续膨胀。" },
      { title: "控制局势，寻找反击机会", body: "接下来在几个大势力之间保持灵活拉扯，夹缝中求生存，一步步压制强敌，把局势扳回来。" },
    ],
  },
  534: {
    level: 534,
    title: "第534关攻略",
    summary: "优先选择高性价比技能，先抢最近的空白塔；必要时放弃主塔，借AI交战的间隙发育，再压制当前最强的对手。",
    image: "/images/guides/mushroom-conflict-534.jpg",
    imageAlt: "蘑菇冲突第534关真实游戏截图",
    steps: [
      { title: "优先选择高性价比技能", body: "开局技能优先选择“全面效果”或“调换技能”，这两个技能的性价比最高。" },
      { title: "不主动进攻，先抢最近的空白塔", body: "开局后不要急于攻打任何敌人，优先抢占距离自己最近的空白塔，先站稳脚跟，不要急于扩张。" },
      { title: "放弃主塔，利用AI互殴发育", body: "如果敌人打你，果断放弃原有主塔，不要恋战、不要死守，保存兵力最重要。放弃主塔后看准AI互殴的间隙，快速抢占无人占领的空白塔，积累资源并扩大势力范围。" },
      { title: "压制最强AI，逐个击破", body: "发育到一定程度后观察战场局势，谁最强就打谁，优先压制当前最强势的AI，防止它一家独大。同时保持自己的节奏，避免被夹击，抓住时机逐个击破，最终拿下全局。" },
    ],
  },
};

export function getGuide(level: number) { return guides[level]; }
export function getGuideLevels() { return Object.keys(guides).map(Number); }
