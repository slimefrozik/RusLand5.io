(function bootstrapSpotlight() {
  const mountNode = document.getElementById("react-spotlight");
  if (!mountNode || !window.React || !window.ReactDOM) {
    return;
  }

  const { createElement: h, useEffect, useMemo, useState } = window.React;

  const copy = {
    ru: {
      title: "Выбери свой стиль игры",
      subtitle: "Выбери роль и посмотри, с чего проще начать на сервере.",
      cta: "Перейти к анкете",
      modes: [
        {
          title: "Торговец",
          points: ["Быстрый старт через аукцион", "Рынок активен в прайм-тайм", "Подходит для соло-игры"]
        },
        {
          title: "Строитель",
          points: ["Долгая прогрессия без вайпов", "Поддержка командных проектов", "Пространство для больших баз"]
        },
        {
          title: "Охотник на боссов",
          points: ["Групповой PvE-контент", "Новые ротации боссов", "Постоянный повод вернуться вечером"]
        }
      ]
    },
    ua: {
      title: "Обери свій стиль гри",
      subtitle: "Обери роль і подивись, з чого простіше почати на сервері.",
      cta: "Перейти до анкети",
      modes: [
        {
          title: "Торговець",
          points: ["Швидкий старт через аукціон", "Ринок активний у прайм-тайм", "Підходить для соло-гри"]
        },
        {
          title: "Будівельник",
          points: ["Довга прогресія без вайпів", "Підтримка командних проєктів", "Простір для великих баз"]
        },
        {
          title: "Мисливець на босів",
          points: ["Груповий PvE-контент", "Нові ротації босів", "Постійний привід повернутися ввечері"]
        }
      ]
    }
  };

  const getLang = () => {
    const saved = localStorage.getItem("rusland_lang");
    return saved === "ua" ? "ua" : "ru";
  };

  function Spotlight() {
    const [lang, setLang] = useState(getLang());
    const [active, setActive] = useState(0);

    useEffect(() => {
      const handleLang = () => setLang(getLang());
      document.addEventListener("rusland:language-changed", handleLang);
      return () => document.removeEventListener("rusland:language-changed", handleLang);
    }, []);

    const data = useMemo(() => copy[lang] || copy.ru, [lang]);
    const current = data.modes[active] || data.modes[0];

    return h("section", { className: "react-spotlight" }, [
      h("h2", { key: "title", className: "react-spotlight-title" }, data.title),
      h("p", { key: "sub", className: "react-spotlight-subtitle" }, data.subtitle),
      h(
        "div",
        { key: "tabs", className: "react-spotlight-tabs", role: "tablist", "aria-label": data.title },
        data.modes.map((mode, index) =>
          h(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": active === index,
              className: active === index ? "is-active" : "",
              onClick: () => setActive(index),
              key: mode.title
            },
            mode.title
          )
        )
      ),
      h(
        "ul",
        { key: "points", className: "react-spotlight-points" },
        current.points.map((point) => h("li", { key: point }, point))
      ),
      h(
        "a",
        { key: "cta", href: "#apply-section", className: "react-spotlight-cta" },
        data.cta
      )
    ]);
  }

  const root = window.ReactDOM.createRoot(mountNode);
  root.render(h(Spotlight));
})();
