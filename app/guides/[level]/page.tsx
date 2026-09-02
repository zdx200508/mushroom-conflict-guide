import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuide, getGuideLevels } from "../../../data/guides";
import CommentsSection from "../../components/CommentsSection";

type GuidePageProps = { params: Promise<{ level: string }> };

export function generateStaticParams() {
  return getGuideLevels().map((level) => ({ level: String(level) }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { level } = await params;
  const guide = getGuide(Number(level));
  if (!guide) return {};
  const title = `${guide.title}｜蘑菇冲突攻略站`;
  return { title, description: guide.summary, openGraph: { title, description: guide.summary, images: [] }, twitter: { title, description: guide.summary, images: [] } };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { level } = await params;
  const guide = getGuide(Number(level));
  if (!guide) notFound();

  return (
    <main>
      <header className="site-header">
        <div className="header-inner">
          <a className="site-brand" href="/guides/532"><span className="brand-mark" aria-hidden="true"><i /><b /></span><span>蘑菇冲突<span className="brand-suffix">攻略站</span></span></a>
          <nav className="top-nav" aria-label="网站导航"><span>首页</span><span className="active">关卡攻略</span><span>新手指南</span><span>社区讨论</span></nav>
          <label className="search-entry"><span aria-hidden="true">⌕</span><input aria-label="搜索关卡（即将开放）" placeholder="搜索关卡（即将开放）" readOnly /></label>
        </div>
      </header>
      <div className="page-shell">
        <aside className="level-sidebar" aria-label="关卡导航">
          <div className="side-heading"><strong>关卡攻略</strong><span>目录</span></div>
          <div className="stage-list">
            <span>阶段 1 <small>1—50关</small></span><span>阶段 2 <small>51—100关</small></span><span>阶段 3 <small>101—150关</small></span><span>阶段 4 <small>151—200关</small></span><span>阶段 5 <small>201—250关</small></span><span>阶段 6 <small>251—300关</small></span><span>阶段 7 <small>301—350关</small></span><span>阶段 8 <small>351—400关</small></span><span>阶段 9 <small>401—450关</small></span><span>阶段 10 <small>451—500关</small></span><span className="current-stage">阶段 11 <small>501关以后</small></span>
          </div>
          <div className="current-level"><span>当前关卡</span><strong>第{guide.level}关</strong></div>
        </aside>
        <div className="content-column">
          <article className="guide-card">
            <nav className="breadcrumbs" aria-label="当前位置">首页 <span>›</span> 关卡攻略 <span>›</span> 第{guide.level}关</nav>
            <header className="guide-heading"><div><span className="level-label">蘑菇冲突 · 实战攻略</span><h1>{guide.title}</h1></div><div className="level-chip">LEVEL {guide.level}</div></header>
            <p className="guide-summary">{guide.summary}</p>
            <div className="section-title"><div><span>01</span><h2>关卡地图</h2></div><p>第{guide.level}关真实游戏画面</p></div>
            <figure className="screenshot-panel"><div className="image-frame"><img src={guide.image} alt={guide.imageAlt} /></div><figcaption><i aria-hidden="true" /> 原始竖屏截图经响应式裁切展示，游戏内容未作修改</figcaption></figure>
            <section className="strategy-section" aria-labelledby="strategy-title">
              <div className="section-title"><div><span>02</span><h2 id="strategy-title">通关要点</h2></div><p>先稳住一个点，再决定打谁</p></div>
              <div className="steps">{guide.steps.map((step, index) => <section className="step" key={step.title}><span className="step-number">{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></section>)}</div>
            </section>
            <CommentsSection level={guide.level} />
          </article>
          <footer className="site-footer">蘑菇冲突攻略站 · 真实关卡内容持续整理中</footer>
        </div>
        <aside className="info-sidebar">
          <section className="quick-card"><p className="eyebrow">本关速览</p><h2>第{guide.level}关</h2><dl><div><dt>开局</dt><dd>拿下左下建筑</dd></div><div><dt>核心</dt><dd>首个据点升至 Max</dd></div><div><dt>目标</dt><dd>压制发展最快的敌人</dd></div><div><dt>后续</dt><dd>灵活拉扯，寻找反击</dd></div></dl></section>
          <section className="notice-card"><span className="notice-icon" aria-hidden="true">!</span><div><strong>攻略说明</strong><p>本页只使用已确认的第532关实战打法与真实截图。</p></div></section>
        </aside>
      </div>
    </main>
  );
}
