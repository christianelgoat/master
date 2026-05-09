export type TheoryDeepDive = {
  title: string;
  content: string;
};

export type TheoryTopic = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  bulletPoints: string[];
  icon: string;
  theme: "blue" | "indigo" | "emerald";
  deepDive: TheoryDeepDive;
};

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: number; // 1 to 40
};

export const theoryData: TheoryTopic[] = [
  {
    id: "org-fundamentals",
    title: "Anatomía de la Organización",
    subtitle: "El sistema social dinámico",
    content: "Una organización no es un ente estático. Es un ecosistema vivo y meticulosamente diseñado corporativamente para orquestar talento y capital. Su objetivo fundamental es la alineación de estos recursos operacionales para alcanzar metas comunes de manera eficiente (optimización máxima de recursos) y eficaz (logro inexorable de objetivos).",
    bulletPoints: [
      "Estructura Organizacional: La arquitectura del poder y la responsabilidad (Jerarquía y Roles).",
      "Procesos y Funciones: La maquinaria táctica (Planificación, Coordinación, Control).",
      "Recursos: El combustible (Capital humano, tecnológico y financiero).",
      "Cultura Organizacional: El ADN invisible (Creencias, Valores compartidos y Normas).",
      "Comunicación: El sistema nervioso (Flujos de información horizontales y verticales)."
    ],
    icon: "Layers",
    theme: "blue",
    deepDive: {
      title: "MIT Sloan Perspective: La Eficacia sobre la Eficiencia",
      content: "Peter Drucker argumentaba que 'no hay nada tan inútil como hacer eficientemente algo que no debería hacerse en absoluto'. En MIT Sloan, enseñamos que la estructura organizacional debe subordinarse a la estrategia. Si optimizas la eficiencia de un proceso obsoleto (Ej. Kodak fabricando rollos), estás acelerando tu propia muerte corporativa."
    }
  },
  {
    id: "strategy-core",
    title: "Arquitectura Estratégica",
    subtitle: "Navegando la ventaja competitiva",
    content: "La estrategia dicta el 'Qué' y el 'Por Qué' a largo plazo. No debe confundirse con la Táctica (el 'Cómo' a mediano plazo) ni con la Operativa (la ejecución diaria). Es el mapa maestro para asegurar la supervivencia, dominancia y extracción de valor en entornos de hiper-competencia.",
    bulletPoints: [
      "Misión (Presente): El imperativo actual. Responde a ¿Quiénes somos? y ¿Por qué existimos? Debe ser auténtica.",
      "Visión (Futuro): La meta aspiracional y atemporal. Responde a ¿Qué queremos llegar a ser?",
      "Objetivos Estratégicos: Cuantificación de la visión (Metas medibles).",
      "Análisis del Entorno: Radar de oportunidades y amenazas externas.",
      "Plan de Acción y Control: Ejecución disciplinada y calibración constante mediante indicadores (KPIs)."
    ],
    icon: "Target",
    theme: "indigo",
    deepDive: {
      title: "Harvard Business Review: La Ilusión de la Estrategia",
      content: "Michael Porter establece que la estrategia competitiva consiste en ser diferente. Significa elegir deliberadamente un conjunto diferente de actividades para entregar una mezcla única de valor. Las metas (ser el número 1) no son estrategias. Una estrategia real requiere un diagnóstico crudo, una política orientadora y acciones coherentes."
    }
  },
  {
    id: "strategy-levels",
    title: "Niveles de Resolución",
    subtitle: "De la Junta Directiva a las trincheras",
    content: "La estrategia en el Siglo XXI exige fluidez. No existe una única estrategia, sino una cascada de decisiones que descienden y ascienden por la pirámide corporativa. Si un nivel se desalinea, ocurre el colapso sistémico.",
    bulletPoints: [
      "Estrategia Corporativa: Responsabilidad de la alta gerencia (Junta/CEO). Dicta la diversificación y el portafolio global.",
      "Estrategias de Negocio: A nivel de divisiones. Foco en la ventaja competitiva dentro de un mercado específico.",
      "Estrategias Funcionales: Jefes funcionales (Marketing, Finanzas, I+D). Alinean sus departamentos al negocio.",
      "Estrategias de Operación: Planta y supervisores de primera línea. Eficiencia diaria y ejecución implacable."
    ],
    icon: "Pyramid",
    theme: "emerald",
    deepDive: {
      title: "Caso de Estudio: El Alineamiento de Real Madrid",
      content: "Estrategia Corporativa: Fichar superestrellas para maximizar ingresos globales. Táctica: El entrenador decide jugar un 4-3-3 basado en los jugadores disponibles ese domingo. Operaciones: El jugador realiza una cobertura defensiva en el minuto 83. La magia ocurre cuando el pase del minuto 83 está alineado con el modelo de negocio global."
    }
  }
];

export const flashcardsData: Flashcard[] = Array.from({ length: 40 }).map((_, i) => {
  const index = i + 1;
  let q = "";
  let a = "";
  let cat = "";

  if (index === 1) { cat = "Organización Base"; q = "¿Qué es una Organización en esencia?"; a = "Un sistema social diseñado para coordinar personas y recursos para alcanzar un objetivo eficientemente."; }
  else if (index === 2) { cat = "Organización Base"; q = "¿Diferencia entre Eficiencia y Eficacia?"; a = "Eficiencia: Optimizar recursos (hacerlo bien). Eficacia: Lograr el objetivo (hacer lo correcto)."; }
  else if (index === 3) { cat = "Estrategia Base"; q = "¿Qué define la Estrategia?"; a = "El camino y las decisiones a largo plazo para asegurar ventaja competitiva."; }
  else if (index === 4) { cat = "Estrategia Base"; q = "Define Misión."; a = "El Presente. Responde a ¿Qué hacemos? y ¿A quién servimos hoy?"; }
  else if (index === 5) { cat = "Estrategia Base"; q = "Define Visión."; a = "El Futuro. Meta aspiracional. ¿Qué queremos llegar a ser?"; }
  else if (index === 6) { cat = "Organización Base"; q = "¿Cuáles son los 5 elementos de un diseño organizacional?"; a = "Estructura, Procesos, Recursos, Cultura, y Comunicación."; }
  else if (index === 7) { cat = "Cultura"; q = "¿Qué es la Cultura Organizacional?"; a = "El ADN invisible: Valores, creencias, normas, hábitos y prácticas compartidas."; }
  else if (index === 8) { cat = "Pirámide"; q = "¿Cuál es el nivel más alto de estrategia?"; a = "Estrategia Corporativa (Junta Directiva/CEO). Deciden portafolio y diversificación."; }
  else if (index === 9) { cat = "Pirámide"; q = "¿Qué es la Estrategia Funcional?"; a = "Estrategias de departamentos (Marketing, HR, Finanzas) alineadas al objetivo de negocio."; }
  else if (index === 10) { cat = "Pirámide"; q = "¿Qué son las Operaciones?"; a = "El nivel más bajo de la pirámide: ejecución diaria, táctica in-situ (Planta, Supervisores)."; }

  else if (index === 11) { cat = "Caso Kodak"; q = "¿Por qué fracasó Kodak?"; a = "Miopía estratégica, resistencia al cambio y desalineación organizacional. Inventaron lo digital pero priorizaron el rollo."; }
  else if (index === 12) { cat = "Métricas"; q = "¿Qué rol juegan los KPIs en la estrategia?"; a = "Miden el desempeño en el Plan de Acción y forzan evaluación y control constante (Feedback loop)."; }
  else if (index === 13) { cat = "Analogía Fútbol"; q = "En el Real Madrid, ¿fichar 'Galácticos' es táctica o estrategia?"; a = "Estrategia Corporativa (modelo de negocio basado en marketing global)."; }
  else if (index === 14) { cat = "Analogía Fútbol"; q = "Formación 4-4-2 para el fin de semana, ¿Qué es?"; a = "Táctica de Negocios. Planificación a mediano plazo para un escenario específico."; }
  else if (index === 15) { cat = "Analogía Fútbol"; q = "Hacer un pase en el minuto 80, ¿Qué es?"; a = "Operativa. Ejecución in situ."; }
  else if (index === 16) { cat = "Análisis"; q = "¿Por qué no basta con tener una buena estrategia?"; a = "Porque sin Organización (estructura, recursos, cultura), la estrategia no se ejecuta. 'Culture eats strategy for breakfast'."; }
  else if (index === 17) { cat = "Estructura"; q = "¿Por qué la Estructura sigue a la Estrategia?"; a = "Si cambias el plan de guerra, debes reorganizar el ejército. Si no cambias la jerarquía, el plan morirá."; }
  else if (index === 18) { cat = "Miopía"; q = "¿Qué es la Miopía de Marketing o Estratégica?"; a = "Definirse por el producto (Hacemos rollos) en vez de la necesidad del cliente (Capturamos recuerdos)."; }
  else if (index === 19) { cat = "Cultura"; q = "Da 3 componentes de la Cultura Organizacional."; a = "Valores, Creencias, Normas de comportamiento."; }
  else if (index === 20) { cat = "Niveles"; q = "¿Cuáles son los 4 niveles de la estrategia organizacional?"; a = "Corporativa, de Negocios, Funcional, de Operación."; }

  else if (index === 21) { cat = "Harvard Nivel 1"; q = "¿Cuál es el propósito central de Michael Porter sobre la Estrategia?"; a = "Competir para ser ÚNICO, no competir para ser el MEJOR. Se trata de tener un mix único de valor."; }
  else if (index === 22) { cat = "Estrategia Dinámica"; q = "¿La estrategia moderna es estática o dinámica?"; a = "Dinámica debido a la hipercompetencia (ciclos de vida cortos, tecnología destructiva). Se readapta ágilmente."; }
  else if (index === 23) { cat = "Comunicaciones"; q = "¿Por qué la Comunicación Interna es vital como 'Sistema Nervioso'?"; a = "Conecta el cerebro (estrategia corporativa) con los músculos (operaciones). Sin ella, hay parálisis o movimientos torpes."; }
  else if (index === 24) { cat = "Jerarquías"; q = "Diferencia entre Jerarquía Vertical y Horizontal"; a = "Vertical es comando/control rígido. Horizontal busca agilidad, equipos autónomos, menor burocracia."; }
  else if (index === 25) { cat = "Trampa de Costos"; q = "¿Es hacer lo mismo pero más barato una estrategia sostenible?"; a = "Solo si tienes ventajas de costos sistémicas a largo plazo (Ej: Walmart), si no, es solo 'Eficacia Operacional', fácilmente copiable."; }
  else if (index === 26) { cat = "Ejemplo Falabella"; q = "¿Qué le falta a su Visión: 'Enriquecer la vida...'"; a = "Es genérica. Cuidado con estrategias que podrían aplicarse a literalmente cualquier empresa, les falta distinción."; }
  else if (index === 27) { cat = "Evaluación"; q = "Fase de Evaluación y Control en la estrategia..."; a = "Permite identificar brechas entre ejecución y plan. Obliga a pivotar antes de la quiebra."; }
  else if (index === 28) { cat = "Harvard Nivel 2"; q = "¿Qué son las 'Capacidades Dinámicas'?"; a = "La habilidad de la organización para integrar, construir y reconfigurar competencias internas/externas ante cambios rápidos."; }
  else if (index === 29) { cat = "Innovación"; q = "¿Se debe innovar en producto o en organización?"; a = "En ambas. Innovar en producto sin estructura ágil genera 'frustración'. Innovar organización sin producto nuevo es 'burocracia moderna'."; }
  else if (index === 30) { cat = "Recursos"; q = "¿Un buen ingeniero es un recurso inagotable?"; a = "No. El capital Humano se quema (Burnout) si la cultura y estrategia lo alinean hacia misiones imposibles sin recursos."; }

  else if (index >= 31 && index <= 40) {
    cat = "MIT / HBS Master";
    if (index === 31) { q = "El problema 'Incumbente' en Innovación Disruptiva (Christensen)"; a = "Las empresas dominantes ignoran tecnologías emergentes inferiores porque priorizan a sus clientes rentables actuales (Dilema del Innovador). Kodak."; }
    if (index === 32) { q = "Alineamiento Estratégico (Balanced Scorecard)"; a = "Framework que traduce la visión en 4 perspectivas: Financiera, Cliente, Procesos Internos, Aprendizaje/Crecimiento."; }
    if (index === 33) { q = "Ventaja Competitiva Transitiva (McGrath)"; a = "En el s. XXI la ventaja no es sostenible. Hay que explotar olas transitorias y saltar a la siguiente innovación perennemente."; }
    if (index === 34) { q = "Sun Tzu aplicado: 'Someter al enemigo sin luchar'"; a = "Crear un Océano Azul: un mercado sin competencia en lugar de pelear en el Océano Rojo (guerra de precios)."; }
    if (index === 35) { q = "Sinergia Corporativa"; a = "1+1=3. Cuando el portafolio de una corporación genera más valor conjunto que la suma de sus partes aisladas."; }
    if (index === 36) { q = "Disonancia Estratégica (Andy Grove)"; a = "Cuando lo que la empresa DICE ser (Estrategia) diverge catastróficamente de lo que HACE (Operaciones y recursos)."; }
    if (index === 37) { q = "Liderazgo Estratégico"; a = "No solo da órdenes. Da sentido/Significado (Sense-making) para que la organización entienda el 'Por Qué' del cambio."; }
    if (index === 38) { q = "Gestión del Cambio Organizacional"; a = "80% falla por descuidar la Cultura (el ADN). No cambias a la gente imponiendo un software, necesitas cambiar las creencias."; }
    if (index === 39) { q = "Riesgo de Agenciar (Agency Code)"; a = "Cuando los gerentes operacionales toman decisiones de corto plazo para su bono, destruyendo la estrategia corporativa de largo plazo."; }
    if (index === 40) { q = "Concepto Final: El Santo Grial del Management", a = "Adaptabilidad Resiliente. Sobre-optimizar hoy mata tu capacidad para maniobrar mañana. Equilibrio entre Explotar (hoy) y Explorar (mañana)."; }
  }

  return {
    id: `fc_${index}`,
    difficulty: index,
    category: cat,
    question: q,
    answer: a
  };
});

