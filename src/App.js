import "./styles.css";
import { useEffect, useRef, useState } from "react";

// Script used on the challenge page to derive FLAG_URL:
// [...document.querySelectorAll('section[data-id^="92"] article[data-class$="45"] div[data-tag*="78"] b.ref[value]')]
//   .map(el => el.getAttribute('value')).join('')

const FLAG_URL =
  "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/636172";

export default function App() {
  const [loading, setLoading] = useState("");
  const [flag, setFlag] = useState("");
  const [displayed, setDisplayed] = useState("");
  const startedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(FLAG_URL, { cache: "no-store" });
        const text = (await res.text()).trim();
        if (isMounted) {
          setFlag(text);
          setLoading(false);
        }
      } catch (e) {
        if (isMounted) {
          setFlag("ERROR");
          setLoading(false);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!flag || startedRef.current) return;
    startedRef.current = true;

    let i = 0;
    setDisplayed("");
    const id = setInterval(() => {
      i++;
      setDisplayed(flag.slice(0, i));
      if (i >= flag.length) clearInterval(id);
    }, 500);

    return () => clearInterval(id);
  }, [flag]);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {displayed.split("").map((ch, idx) => (
        <li key={idx}>{ch}</li>
      ))}
    </ul>
  );
}
