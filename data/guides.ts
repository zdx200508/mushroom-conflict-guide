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
};

export function getGuide(level: number) { return guides[level]; }
export function getGuideLevels() { return Object.keys(guides).map(Number); }
