import GuideSearch from "./GuideSearch";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="site-brand" href="/guides/532"><span className="brand-mark" aria-hidden="true"><i /><b /></span><span>蘑菇冲突<span className="brand-suffix">攻略站</span></span></a>
        <nav className="top-nav" aria-label="网站导航"><span>首页</span><span className="active">关卡攻略</span><span>新手指南</span><span>社区讨论</span></nav>
        <GuideSearch />
      </div>
    </header>
  );
}
