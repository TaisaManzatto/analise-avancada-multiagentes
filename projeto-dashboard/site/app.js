"use strict";

(() => {
  // Demonstration-only credentials. Change these constants for a different local demo;
  // this client-side check is public and must never be treated as production security.
  const DEMO_CREDENTIALS = Object.freeze({ username: "demo", password: "papelaria2026" });
  const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const integer = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" });
  const byId = (id) => document.getElementById(id);
  const cityFilter = byId("filter-city");
  const categoryFilter = byId("filter-category");
  const tableBody = byId("sales-table");
  let records = [];
  let activeSelection = [];

  function safeCurrency(value) {
    return Number.isFinite(value) ? currency.format(value) : currency.format(0);
  }

  function option(select, value, label) {
    const item = document.createElement("option");
    item.value = value;
    item.textContent = label;
    select.append(item);
  }

  function renderChart(targetId, title, groupingField, selected) {
    const container = byId(targetId);
    container.replaceChildren();
    if (selected.length === 0) {
      const empty = document.createElement("p");
      empty.className = "chart-empty";
      empty.textContent = "Sem dados para exibir com estes filtros.";
      container.append(empty);
      return;
    }

    const totals = new Map();
    selected.forEach((row) => totals.set(groupingField === "categoria" ? row.categoria : row.cidade,
      (totals.get(groupingField === "categoria" ? row.categoria : row.cidade) || 0) + row.valor_venda));
    const entries = [...totals.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"));
    // Match the SVG coordinate width to its rendered CSS-pixel width whenever the
    // browser exposes it. A 720-unit fallback keeps DOM-only test harnesses working.
    const measuredWidth = Number.isFinite(container.clientWidth) && container.clientWidth > 0
      ? Math.floor(container.clientWidth)
      : 720;
    const width = Math.max(220, measuredWidth);
    const compact = width < 520;
    const rowHeight = compact ? 38 : 46;
    const height = entries.length * rowHeight + 12;
    const labelWidth = compact
      ? Math.min(96, Math.max(76, Math.round(width * 0.31)))
      : Math.min(160, Math.max(130, Math.round(width * 0.30)));
    const valueWidth = compact ? Math.min(108, Math.max(96, Math.round(width * 0.38))) : 122;
    const barStart = labelWidth + (compact ? 7 : 10);
    const barEnd = width - valueWidth - 5;
    const barArea = Math.max(12, barEnd - barStart);
    const barHeight = compact ? 14 : 22;
    const labelFontSize = compact ? 13 : 16;
    const valueFontSize = compact ? 13 : 14;
    const maxValue = Math.max(...entries.map((entry) => entry[1]), 0);
    const scaleBase = maxValue > 0 ? maxValue : 1;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-labelledby", `${targetId}-title ${targetId}-description`);
    const svgTitle = document.createElementNS(svg.namespaceURI, "title");
    svgTitle.id = `${targetId}-title`;
    svgTitle.textContent = title;
    const desc = document.createElementNS(svg.namespaceURI, "desc");
    desc.id = `${targetId}-description`;
    desc.textContent = entries.map(([label, value]) => `${label}: ${safeCurrency(value)}`).join(". ");
    svg.append(svgTitle, desc);

    entries.forEach(([label, value], index) => {
      const y = 6 + index * rowHeight;
      const group = document.createElementNS(svg.namespaceURI, "g");
      const labelText = document.createElementNS(svg.namespaceURI, "text");
      labelText.setAttribute("x", "2");
      labelText.setAttribute("y", String(y + 25));
      labelText.setAttribute("fill", "#263747");
      labelText.setAttribute("font-size", String(labelFontSize));
      labelText.textContent = label;
      const track = document.createElementNS(svg.namespaceURI, "rect");
      track.setAttribute("x", String(barStart));
      track.setAttribute("y", String(y + (compact ? 11 : 8)));
      track.setAttribute("width", String(barArea));
      track.setAttribute("height", String(barHeight));
      track.setAttribute("rx", "5");
      track.setAttribute("fill", "#e9e2d4");
      const bar = document.createElementNS(svg.namespaceURI, "rect");
      bar.setAttribute("x", String(barStart));
      bar.setAttribute("y", String(y + (compact ? 11 : 8)));
      bar.setAttribute("width", String(Math.max(0, barArea * value / scaleBase)));
      bar.setAttribute("height", String(barHeight));
      bar.setAttribute("rx", "5");
      bar.setAttribute("fill", index === 0 ? "#45675b" : "#80505d");
      const valueText = document.createElementNS(svg.namespaceURI, "text");
      valueText.setAttribute("x", String(width - 4));
      valueText.setAttribute("y", String(y + 25));
      valueText.setAttribute("text-anchor", "end");
      valueText.setAttribute("fill", "#263747");
      valueText.setAttribute("font-size", String(valueFontSize));
      valueText.setAttribute("font-weight", "700");
      valueText.textContent = safeCurrency(value);
      group.append(labelText, track, bar, valueText);
      svg.append(group);
    });
    container.append(svg);
  }

  function renderCharts(selected) {
    renderChart("category-chart", "Valor vendido por categoria", "categoria", selected);
    renderChart("city-chart", "Valor vendido por cidade", "cidade", selected);
  }

  function addCell(row, value, className = "") {
    const cell = document.createElement("td");
    cell.textContent = value;
    if (className) cell.className = className;
    row.append(cell);
  }

  function renderTable(selected) {
    const fragment = document.createDocumentFragment();
    selected.forEach((sale) => {
      const row = document.createElement("tr");
      const date = dateFormatter.format(new Date(`${sale.data}T00:00:00Z`));
      addCell(row, date);
      addCell(row, sale.id_venda);
      addCell(row, sale.cidade);
      addCell(row, sale.categoria);
      addCell(row, sale.produto);
      addCell(row, integer.format(sale.quantidade), "numeric");
      addCell(row, safeCurrency(sale.preco_unitario), "numeric");
      addCell(row, safeCurrency(sale.valor_venda), "numeric");
      fragment.append(row);
    });
    tableBody.replaceChildren(fragment);
  }

  function update() {
    const city = cityFilter.value;
    const category = categoryFilter.value;
    const selected = records.filter((row) => (!city || row.cidade === city) && (!category || row.categoria === category));
    activeSelection = selected;
    const total = selected.reduce((sum, row) => sum + row.valor_venda, 0);
    const average = selected.length ? total / selected.length : 0;

    byId("kpi-total").textContent = safeCurrency(total);
    byId("kpi-count").textContent = integer.format(selected.length);
    byId("kpi-average").textContent = safeCurrency(average);
    byId("result-count").textContent = `${integer.format(selected.length)} ${selected.length === 1 ? "venda encontrada" : "vendas encontradas"}.`;
    byId("empty-state").hidden = selected.length !== 0;
    renderCharts(selected);
    renderTable(selected);
  }

  // Redraw only the SVG layouts on viewport changes; aggregations and data stay intact.
  if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
    let resizePending = false;
    window.addEventListener("resize", () => {
      if (resizePending) return;
      resizePending = true;
      const redraw = () => {
        resizePending = false;
        renderCharts(activeSelection);
      };
      if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(redraw);
      else redraw();
    });
  }

  let hasStarted = false;
  async function start() {
    if (hasStarted) return;
    hasStarted = true;
    try {
      const response = await fetch("./dados/dashboard.json");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data.records)) throw new Error("Formato de dados inválido");
      records = data.records;
      [...new Set(records.map((row) => row.cidade))].sort((a, b) => a.localeCompare(b, "pt-BR"))
        .forEach((city) => option(cityFilter, city, city));
      [...new Set(records.map((row) => row.categoria))].sort((a, b) => a.localeCompare(b, "pt-BR"))
        .forEach((category) => option(categoryFilter, category, category));
      byId("date-range").textContent = `${dateFormatter.format(new Date(`${data.metadata.data_inicial}T00:00:00Z`))} a ${dateFormatter.format(new Date(`${data.metadata.data_final}T00:00:00Z`))}`;
      cityFilter.addEventListener("change", update);
      categoryFilter.addEventListener("change", update);
      byId("clear-filters").addEventListener("click", () => {
        cityFilter.value = "";
        categoryFilter.value = "";
        update();
        cityFilter.focus();
      });
      update();
    } catch (error) {
      console.error("Falha ao inicializar o painel:", error);
      byId("load-error").hidden = false;
      byId("result-count").textContent = "Dados indisponíveis.";
    }
  }

  // A real page exposes a form element. The older data-only harness returns a generic
  // placeholder for unknown IDs, so it can still exercise the dashboard fallback.
  const loginCandidate = byId("login-form");
  const loginForm = loginCandidate && String(loginCandidate.tagName).toLowerCase() === "form"
    ? loginCandidate
    : null;

  if (loginForm) {
    const loginScreen = byId("login-screen");
    const dashboardApp = byId("dashboard-app");
    const userInput = byId("login-user");
    const passwordInput = byId("login-password");
    const loginError = byId("login-error");
    const skipLink = byId("skip-link");
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = userInput.value.trim();
      const password = passwordInput.value;
      if (username !== DEMO_CREDENTIALS.username || password !== DEMO_CREDENTIALS.password) {
        loginError.textContent = "Usuário ou senha incorretos. Use as credenciais de demonstração exibidas nesta tela.";
        loginError.hidden = false;
        passwordInput.focus();
        return;
      }
      loginError.textContent = "";
      loginError.hidden = true;
      loginScreen.hidden = true;
      loginForm.hidden = true;
      dashboardApp.hidden = false;
      skipLink.href = "#conteudo";
      start();
      byId("conteudo").focus();
    });

    byId("logout-button").addEventListener("click", () => {
      dashboardApp.hidden = true;
      loginScreen.hidden = false;
      loginForm.hidden = false;
      skipLink.href = "#login-title";
      userInput.value = "";
      passwordInput.value = "";
      loginError.textContent = "";
      loginError.hidden = true;
      userInput.focus();
    });
  } else {
    // Legacy harness fallback only; the published page always starts at the login screen.
    start();
  }
})();
