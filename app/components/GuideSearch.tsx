"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function GuideSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = value.trim();
    if (!/^\d+$/.test(input)) {
      setMessage("请输入正确的关卡号");
      return;
    }
    const level = Number(input);
    if (!Number.isSafeInteger(level) || level < 1) {
      setMessage("请输入正确的关卡号");
      return;
    }
    setMessage("");
    router.push(`/guides/${level}`);
  }

  return (
    <form className="search-entry" onSubmit={handleSubmit} noValidate>
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        aria-label="搜索关卡"
        inputMode="numeric"
        value={value}
        onChange={(event) => { setValue(event.target.value); setMessage(""); }}
        placeholder="输入关卡号"
      />
      <button type="submit">搜索</button>
      {message && <span className="search-message" role="status">{message}</span>}
    </form>
  );
}
