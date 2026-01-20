// ================ APP STATE ================
const state = {
  currentView: "generator",
  savedCopies: JSON.parse(localStorage.getItem("savedCopies") || "[]"),
  currentCopy: null,
};

// ================ COPY GENERATION ENGINE ================
const copyEngine = {
  // Fórmula AIDA
  aida: (data) => {
    const { productName, mainBenefit, features, painPoints, targetAudience } =
      data;
    return `🎯 **ATENÇÃO:** ${targetAudience}!

Cansado de ${painPoints.split(",")[0].trim().toLowerCase()}?

💡 **INTERESSE:** ${productName} é a solução que você estava esperando!

Imagine ${mainBenefit.toLowerCase()}. Isso é possível com nossa tecnologia exclusiva.

✨ **DESEJO:** Veja o que você vai conseguir:
${features
  .split(",")
  .map((f) => `• ${f.trim()}`)
  .join("\n")}

🚀 **AÇÃO:** Não perca tempo! Garanta já o seu e transforme sua experiência hoje mesmo!

${data.price ? `💰 Por apenas ${data.price}` : ""}

[COMPRAR AGORA]`;
  },

  // Fórmula PAS
  pas: (data) => {
    const { productName, mainBenefit, painPoints } = data;
    const problems = painPoints.split(",").map((p) => p.trim());

    return `❌ **PROBLEMA:**
Você já passou por isso?
${problems.map((p) => `• ${p}`).join("\n")}

😰 **AGITAÇÃO:**
Cada dia que passa com esses problemas significa:
• Mais frustração e resultados abaixo do esperado
• Tempo e dinheiro desperdiçados
• Oportunidades perdidas que seus concorrentes estão aproveitando

✅ **SOLUÇÃO:**
${productName} resolve tudo isso!

${mainBenefit}

Pare de sofrer com ${problems[0].toLowerCase()}. A solução está aqui.

[CLIQUE AQUI E MUDE SUA REALIDADE]`;
  },

  // Fórmula FAB
  fab: (data) => {
    const { productName, features, mainBenefit } = data;
    const featureList = features.split(",").map((f) => f.trim());

    return `🎁 **${productName.toUpperCase()}**

**CARACTERÍSTICAS:**
${featureList.map((f) => `✓ ${f}`).join("\n")}

**VANTAGENS:**
Essas características significam:
• Qualidade superior comparada aos concorrentes
• Tecnologia de ponta ao seu alcance
• Investimento inteligente no seu sucesso

**BENEFÍCIOS:**
O impacto real na sua vida:
${mainBenefit}

É isso que você merece. É isso que ${productName} entrega.

[QUERO EXPERIMENTAR AGORA]`;
  },

  // Fórmula 4 P's
  fourPs: (data) => {
    const { productName, mainBenefit, painPoints } = data;

    return `**PROBLEMA:**
${painPoints.split(",")[0].trim()} está impedindo você de alcançar seus objetivos.

**PROMESSA:**
Com ${productName}, você vai finalmente conseguir ${mainBenefit.toLowerCase()}.

**PROVA:**
✓ Testado e aprovado por milhares de clientes
✓ Resultados comprovados cientificamente
✓ Garantia de 30 dias - satisfação total ou seu dinheiro de volta

**PROPOSTA:**
Experimente ${productName} sem riscos.
${data.price ? `Investimento: ${data.price}` : ""}

[COMEÇAR AGORA - 100% GARANTIDO]`;
  },

  // Fórmula BAB (Before-After-Bridge)
  bab: (data) => {
    const { productName, mainBenefit, painPoints } = data;

    return `**ANTES:**
Você enfrenta: ${painPoints.toLowerCase()}
Resultados frustrantes, tempo perdido, dinheiro jogado fora.

**DEPOIS:**
Imagine ${mainBenefit.toLowerCase()}
Resultados extraordinários, economia de tempo, investimento inteligente.

**A PONTE:**
${productName} é a ponte entre onde você está e onde quer chegar.

Centenas de pessoas já fizeram essa transformação.
Agora é a SUA vez!

[SIM, EU QUERO ESSA TRANSFORMAÇÃO!]`;
  },
};

// ================ COPY TYPE GENERATORS ================
const copyTypes = {
  "product-description": (data, formula) => {
    const baseCopy = copyEngine[formula](data);
    return {
      main: baseCopy,
      variations: [
        {
          title: "📱 Versão Curta (Para destaque)",
          content: `${data.productName}\n\n${data.mainBenefit}\n\n${data.features
            .split(",")
            .slice(0, 3)
            .map((f) => `✓ ${f.trim()}`)
            .join("\n")}\n\n${data.price || "Consulte condições especiais"}`,
        },
        {
          title: "🎯 Bullet Points (Para lista)",
          content: data.features
            .split(",")
            .map((f) => `• ${f.trim()}`)
            .join("\n"),
        },
        {
          title: "💎 Headline Impactante",
          content: `${data.productName}: ${data.mainBenefit}`,
        },
      ],
    };
  },

  "facebook-ad": (data, formula) => {
    const baseCopy = copyEngine[formula](data);
    const emoji = data.productType === "digital" ? "💻" : "🎁";

    return {
      main: baseCopy,
      variations: [
        {
          title: "📱 Headline do Anúncio",
          content: `${emoji} ${data.mainBenefit.split(".")[0]}`,
        },
        {
          title: "📝 Texto Principal",
          content: `${data.targetAudience}! 👋\n\n${data.painPoints.split(",")[0].trim()}?\n\n${data.productName} vai mudar isso! ${data.mainBenefit}\n\n✨ ${data.features
            .split(",")
            .slice(0, 2)
            .map((f) => f.trim())
            .join("\n✨ ")}\n\n👉 Clique no link e descubra como!`,
        },
        {
          title: "🎯 Call-to-Action",
          content: `QUERO ${data.productName.toUpperCase()} AGORA!`,
        },
      ],
    };
  },

  "google-ad": (data, formula) => {
    return {
      main: `**ANÚNCIO GOOGLE ADS**\n\n📍 Título 1: ${data.productName} - ${data.mainBenefit.split(".")[0]}\n📍 Título 2: ${data.features.split(",")[0].trim()}\n📍 Título 3: ${data.price ? `A partir de ${data.price}` : "Oferta Especial"}\n\n📝 Descrição 1: ${data.mainBenefit}\n📝 Descrição 2: ${data.features
        .split(",")
        .slice(0, 2)
        .map((f) => f.trim())
        .join(". ")}.`,
      variations: [
        {
          title: "🔍 Palavras-chave Sugeridas",
          content: `• ${data.productName.toLowerCase()}\n• ${data.category.toLowerCase()}\n• ${data.category.toLowerCase()} para ${data.targetAudience.split(" ")[0].toLowerCase()}\n• melhor ${data.category.toLowerCase()}\n• ${data.category.toLowerCase()} barato`,
        },
        {
          title: "🎯 Extensões de Anúncio",
          content: data.features
            .split(",")
            .slice(0, 4)
            .map((f) => `• ${f.trim()}`)
            .join("\n"),
        },
      ],
    };
  },

  "email-sales": (data, formula) => {
    const baseCopy = copyEngine[formula](data);

    return {
      main: `**ASSUNTO:** ${data.mainBenefit.split(".")[0]} 🎯\n\n**PREVIEW:** Descubra como ${data.productName} pode transformar...\n\n---\n\nOlá!\n\n${baseCopy}\n\n---\n\nAtenciosamente,\nEquipe ${data.productName}`,
      variations: [
        {
          title: "✉️ Variação de Assunto 1",
          content: `🚨 [URGENTE] ${data.productName}: Não perca esta oportunidade!`,
        },
        {
          title: "✉️ Variação de Assunto 2",
          content: `💡 Finalmente: Como ${data.mainBenefit.split(".")[0].toLowerCase()}`,
        },
        {
          title: "✉️ Variação de Assunto 3",
          content: `${data.targetAudience}: Isso vai mudar tudo! ✨`,
        },
      ],
    };
  },

  "landing-page": (data, formula) => {
    const baseCopy = copyEngine[formula](data);

    return {
      main: `**🎯 HERO SECTION**\n\nH1: ${data.productName}\nSubtítulo: ${data.mainBenefit}\nCTA: [COMEÇAR AGORA]\n\n---\n\n**😰 SEÇÃO PROBLEMA**\n\n${data.painPoints
        .split(",")
        .map((p) => `• ${p.trim()}`)
        .join(
          "\n",
        )}\n\n---\n\n**✨ SEÇÃO SOLUÇÃO**\n\n${baseCopy}\n\n---\n\n**🎁 CARACTERÍSTICAS**\n\n${data.features
        .split(",")
        .map((f) => `✓ ${f.trim()}`)
        .join(
          "\n",
        )}\n\n---\n\n**💰 PREÇO**\n\n${data.price || "Entre em contato para saber mais"}\n\n---\n\n**🚀 CTA FINAL**\n\n[GARANTIR MINHA VAGA AGORA]`,
      variations: [
        {
          title: "🏆 Seção de Garantia",
          content: `✅ Garantia de 30 dias\n✅ Satisfação 100% garantida\n✅ Suporte dedicado\n✅ Atualizações gratuitas`,
        },
        {
          title: "⭐ Seção de Depoimentos",
          content: `"${data.productName} mudou completamente minha forma de trabalhar!"\n- Cliente Satisfeito\n\n⭐⭐⭐⭐⭐ 5.0/5.0 (baseado em 500+ avaliações)`,
        },
      ],
    };
  },

  "social-media": (data, formula) => {
    const emoji = data.productType === "digital" ? "💻" : "🎁";

    return {
      main: `${emoji} **${data.productName.toUpperCase()}** ${emoji}\n\n${data.mainBenefit}\n\n✨ ${data.features
        .split(",")
        .slice(0, 3)
        .map((f) => f.trim())
        .join(
          "\n✨ ",
        )}\n\n👉 Link na bio!\n\n#${data.category.replace(/\s+/g, "")} #${data.productName.replace(/\s+/g, "")} #vendas #marketing`,
      variations: [
        {
          title: "📸 Story / Reels",
          content: `🔥 NOVO!\n\n${data.productName}\n\n${data.mainBenefit.split(".")[0]}\n\n👆 Deslize para cima!`,
        },
        {
          title: "🎬 Caption Longa",
          content: `Você sabia?\n\n${data.painPoints.split(",")[0].trim()} é um dos maiores problemas de ${data.targetAudience.toLowerCase()}.\n\nPor isso criamos ${data.productName}! 💪\n\n${data.mainBenefit}\n\nE o melhor: ${data.features.split(",")[0].trim()}!\n\nQuem aí quer experimentar? Comenta aqui! 👇`,
        },
        {
          title: "#️⃣ Hashtags Extras",
          content: `#marketing #vendasonline #empreendedorismo #negociosonline #vendas #marketingdigital #sucesso #foco #resultados #transformacao`,
        },
      ],
    };
  },

  whatsapp: (data, formula) => {
    return {
      main: `Olá! 👋\n\nVi que você tem interesse em ${data.category.toLowerCase()}.\n\nQueria te apresentar o *${data.productName}*!\n\n${data.mainBenefit}\n\n✅ ${data.features
        .split(",")
        .slice(0, 3)
        .map((f) => f.trim())
        .join(
          "\n✅ ",
        )}\n\n${data.price ? `💰 Investimento: *${data.price}*` : ""}\n\nTenho certeza que vai adorar!\n\nPosso te enviar mais informações? 😊`,
      variations: [
        {
          title: "⚡ Mensagem Urgente",
          content: `🚨 ATENÇÃO!\n\nÚltimas unidades de ${data.productName}!\n\n${data.mainBenefit}\n\nGaranta o seu AGORA! ⏰`,
        },
        {
          title: "🎁 Mensagem Promocional",
          content: `🎉 PROMOÇÃO ESPECIAL!\n\n${data.productName}\n${data.price ? `De R$ XXX por apenas *${data.price}*` : "Condições especiais!"}\n\nApenas hoje! Não perca! 🔥`,
        },
      ],
    };
  },
};

// ================ FORM HANDLING ================
document
  .getElementById("product-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      productType: document.getElementById("product-type").value,
      productName: document.getElementById("product-name").value,
      category: document.getElementById("product-category").value,
      targetAudience: document.getElementById("target-audience").value,
      mainBenefit: document.getElementById("main-benefit").value,
      features: document.getElementById("features").value,
      painPoints: document.getElementById("pain-points").value,
      price: document.getElementById("price").value,
      copyType: document.getElementById("copy-type").value,
      formula: document.getElementById("formula").value,
    };

    generateCopy(formData);
  });

// ================ COPY GENERATION ================
function generateCopy(data) {
  const outputContent = document.getElementById("output-content");
  const variationsContainer = document.getElementById("variations-container");
  const copyAllBtn = document.getElementById("copy-all-btn");

  // Show loading state
  outputContent.innerHTML =
    '<div class="loading" style="height: 300px; border-radius: 12px;"></div>';

  setTimeout(() => {
    // Map formula names to function names
    const formulaMap = {
      aida: "aida",
      pas: "pas",
      fab: "fab",
      "4ps": "fourPs",
      bab: "bab",
    };

    const generator = copyTypes[data.copyType];
    const result = generator(data, formulaMap[data.formula]);

    // Display main copy
    outputContent.innerHTML = `
            <div class="copy-section">
                <div class="copy-section-title">
                    <span>📄</span> Copy Principal
                </div>
                <div class="copy-text">${formatCopy(result.main)}</div>
                <button class="copy-action-btn" onclick="copySingleText(\`${escapeText(result.main)}\`)">
                    <span>📋</span> Copiar
                </button>
            </div>
        `;

    // Display variations
    if (result.variations && result.variations.length > 0) {
      variationsContainer.style.display = "block";
      variationsContainer.querySelector("#variations-content").innerHTML =
        result.variations
          .map(
            (v) => `
                <div class="variation-item">
                    <div class="copy-section-title">${v.title}</div>
                    <div class="copy-text">${formatCopy(v.content)}</div>
                    <button class="copy-action-btn" onclick="copySingleText(\`${escapeText(v.content)}\`)">
                        <span>📋</span> Copiar
                    </button>
                </div>
            `,
          )
          .join("");
    }

    // Show copy all button
    copyAllBtn.style.display = "flex";

    // Store current copy for saving
    state.currentCopy = {
      id: Date.now(),
      date: new Date().toISOString(),
      productName: data.productName,
      copyType: data.copyType,
      formula: data.formula,
      content: result,
      formData: data,
    };

    // Auto-save
    saveCopy(state.currentCopy);

    showToast("✨ Copy gerado com sucesso!");
  }, 800);
}

// ================ TEXT FORMATTING ================
function formatCopy(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>")
    .replace(/•/g, "&#8226;")
    .replace(/✓/g, "&#10003;");
}

function escapeText(text) {
  return text.replace(/`/g, "\\`").replace(/\$/g, "\\$").replace(/\n/g, "\\n");
}

// ================ COPY TO CLIPBOARD ================
function copySingleText(text) {
  const cleanText = text
    .replace(/\\n/g, "\n")
    .replace(/\\`/g, "`")
    .replace(/\\\$/g, "$");

  navigator.clipboard.writeText(cleanText).then(() => {
    showToast("📋 Copiado para área de transferência!");
  });
}

document.getElementById("copy-all-btn")?.addEventListener("click", () => {
  if (state.currentCopy) {
    let fullText = state.currentCopy.content.main + "\n\n";

    if (state.currentCopy.content.variations) {
      fullText += "---VARIAÇÕES---\n\n";
      state.currentCopy.content.variations.forEach((v) => {
        fullText += `${v.title}\n${v.content}\n\n`;
      });
    }

    navigator.clipboard.writeText(fullText).then(() => {
      showToast("📋 Todas as copies copiadas!");
    });
  }
});

// ================ SAVE/LOAD COPIES ================
function saveCopy(copy) {
  const existingIndex = state.savedCopies.findIndex((c) => c.id === copy.id);

  if (existingIndex >= 0) {
    state.savedCopies[existingIndex] = copy;
  } else {
    state.savedCopies.unshift(copy);
  }

  // Keep only last 50 copies
  state.savedCopies = state.savedCopies.slice(0, 50);

  localStorage.setItem("savedCopies", JSON.stringify(state.savedCopies));
  renderSavedCopies();
}

function deleteCopy(id) {
  state.savedCopies = state.savedCopies.filter((c) => c.id !== id);
  localStorage.setItem("savedCopies", JSON.stringify(state.savedCopies));
  renderSavedCopies();
  showToast("🗑️ Copy excluído!");
}

function renderSavedCopies() {
  const container = document.getElementById("saved-copies-container");

  if (state.savedCopies.length === 0) {
    container.innerHTML = `
            <div class="empty-saved">
                <div class="icon">💾</div>
                <h3>Nenhuma copy salva ainda</h3>
                <p>As copies que você gerar serão salvas automaticamente aqui</p>
            </div>
        `;
    return;
  }

  container.innerHTML = state.savedCopies
    .map((copy) => {
      const date = new Date(copy.date);
      const formattedDate = date.toLocaleDateString("pt-BR");
      const preview = copy.content.main.substring(0, 150).replace(/\*\*/g, "");

      return `
            <div class="saved-copy-card">
                <div class="saved-copy-header">
                    <h3 class="saved-copy-title">${copy.productName}</h3>
                    <span class="saved-copy-type">${getCopyTypeLabel(copy.copyType)}</span>
                </div>
                <div class="saved-copy-preview">${preview}...</div>
                <div class="saved-copy-meta">
                    <span>${formattedDate}</span>
                    <div class="saved-copy-actions">
                        <button class="action-icon-btn" onclick="viewCopy(${copy.id})" title="Ver completo">👁️</button>
                        <button class="action-icon-btn" onclick="copySingleText(\`${escapeText(copy.content.main)}\`)" title="Copiar">📋</button>
                        <button class="action-icon-btn" onclick="deleteCopy(${copy.id})" title="Excluir">🗑️</button>
                    </div>
                </div>
            </div>
        `;
    })
    .join("");
}

function viewCopy(id) {
  const copy = state.savedCopies.find((c) => c.id === id);
  if (copy) {
    state.currentCopy = copy;
    switchView("generator");

    // Fill form with saved data
    document.getElementById("product-type").value = copy.formData.productType;
    document.getElementById("product-name").value = copy.formData.productName;
    document.getElementById("product-category").value = copy.formData.category;
    document.getElementById("target-audience").value =
      copy.formData.targetAudience;
    document.getElementById("main-benefit").value = copy.formData.mainBenefit;
    document.getElementById("features").value = copy.formData.features;
    document.getElementById("pain-points").value = copy.formData.painPoints;
    document.getElementById("price").value = copy.formData.price || "";
    document.getElementById("copy-type").value = copy.formData.copyType;
    document.getElementById("formula").value = copy.formData.formula;

    // Display the copy
    generateCopy(copy.formData);
  }
}

function getCopyTypeLabel(type) {
  const labels = {
    "product-description": "E-commerce",
    "facebook-ad": "Facebook/Instagram",
    "google-ad": "Google Ads",
    "email-sales": "Email",
    "landing-page": "Landing Page",
    "social-media": "Redes Sociais",
    whatsapp: "WhatsApp",
  };
  return labels[type] || type;
}

// ================ NAVIGATION ================
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;
    switchView(view);
  });
});

function switchView(viewName) {
  // Update nav buttons
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  // Update views
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === `${viewName}-view`);
  });

  state.currentView = viewName;

  // Render saved copies when viewing that section
  if (viewName === "saved") {
    renderSavedCopies();
  }
}

// ================ TOAST NOTIFICATION ================
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ================ INITIALIZATION ================
document.addEventListener("DOMContentLoaded", () => {
  renderSavedCopies();
});
