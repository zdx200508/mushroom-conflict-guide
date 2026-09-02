import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "蘑菇冲突攻略站",
  description: "按关卡整理的蘑菇冲突真实攻略。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
