const chatIcon = document.getElementById("chat-icon");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("close-chat");
const chatBody = document.getElementById("chat-body");
chatIcon.onclick = () => {
    chatbot.style.display = "block";
    startChat();
};
closeChat.onclick = () => {
    chatbot.style.display = "none";
    chatBody.innerHTML = "";
};
function clearOptions() {
    document.querySelectorAll(".options").forEach(el => el.remove());
}
function addBotMessage(text) {
    const div = document.createElement("div");
    div.className = "bot";
    div.innerHTML = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}
function addOptions(options) {
    clearOptions();
    const div = document.createElement("div");
    div.className = "options";
    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt.text;
        btn.onclick = opt.action;
        div.appendChild(btn);
    });
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
}
function startChat() {
    chatBody.innerHTML = "";
    addBotMessage(`
        ${getGreeting()} 👋<br><br>
        Gracias por escribir. Soy el asistente virtual de Juan Felipe, ingeniero informático.
        Estoy aquí para ayudarte y responder tus preguntas en su nombre.<br><br>
        ¿En qué puedo asistirte hoy?
    `);
    addOptions([
        { text: "Necesito información", action: showInfoOptions }
    ]);
}
function showInfoOptions() {
    addBotMessage(
        "¿Qué tipo de información necesitas? Para brindarte la información necesaria, te mostraré estas opciones:"
    );
    addOptions([
        { text: "Quiero que me hables de sus habilidades", action: habilidades },
        { text: "Dime los proyectos que ha realizado en este año 2026", action: proyectos2026 },
        { text: "Cuáles son sus próximos proyectos y cómo estar informado de su progreso", action: proximosProyectos },
        { text: "¿Deseas ponerte en contacto con Juan Felipe?", action: contacto },
        { text: "¿Te gustaría seguirlo en sus redes sociales?", action: redes },
        { text: "No, muchas gracias. Adiós", action: despedida }
    ]);
}
function habilidades() {
    addBotMessage(`
        Él es Ingeniero Informático con experiencia en desarrollo web, tanto frontend (HTML, CSS, JS)
        como backend (PHP y PHPMyAdmin).<br><br>
        También domina Python, Java y Visual Basic .NET para crear soluciones eficientes y confiables.
        Además, desarrolla videojuegos en GameMaker Studio 2, diseñando experiencias interactivas y educativas.<br><br>
        Juan Felipe trabaja bien en equipo o de manera autónoma, siempre enfocado en innovar y entregar resultados.
    `);
    regresarOAdios();
}
function proyectos2026() {
    addBotMessage(`
        Este año 2026, Juan Felipe ha trabajado en varios proyectos importantes:<br><br>
        🔹 Sistema de Autenticación para mejorar la seguridad en aplicaciones web.<br>
        🔹 Administrador de Tareas para organizar proyectos de manera eficiente.<br>
        🔹 Otros proyectos de desarrollo web y software interactivo.<br><br>
        Puedes ver todos los detalles en la sección de Categorías.
    `);
    regresarOAdios();
}
function proximosProyectos() {
    addBotMessage(`
        Sobre los próximos proyectos de Juan Felipe:<br><br>
        Todos los nuevos desarrollos se mostrarán en la página cuando estén listos para publicarse.
        Te recomiendo tener un poco de paciencia ⏳, ya que cada proyecto se comparte a su debido tiempo
        para garantizar la mejor calidad.<br><br>
        Cuando estén disponibles, los encontrarás en la sección de Categorías.
    `);
    regresarOAdios();
}
function contacto() {
    addBotMessage(`
        Si deseas contactarlo, puedes hacerlo a través de los siguientes medios:<br><br>
        📧 Correo electrónico: <b>estoesunejemplo@hotmail.com</b><br>
        📱 WhatsApp: <b>12345678910</b>
    `);
    regresarOAdios();
}
function redes() {
    addBotMessage(`
        ¡Excelente decisión! 🙌<br><br>
        Podrás estar informado de sus proyectos y novedades en sus redes sociales:<br><br>
        📘 Facebook: <b>ejemplodev</b><br>
        🐦 Twitter (X): <b>ejemplodev</b><br>
        📸 Instagram: <b>ejemplodev</b>
    `);
    regresarOAdios();
}
function regresarOAdios() {
    addOptions([
        { text: "Regresar a las preguntas", action: showInfoOptions },
        { text: "Adiós, muchas gracias", action: despedida }
    ]);
}
function despedida() {
    addBotMessage(`
        Me alegra haberte ayudado 😊<br><br>
        Gracias a ti por tomarte el tiempo de buscar la información necesaria.
        ¡Que tengas un excelente día!
    `);
    clearOptions();
}