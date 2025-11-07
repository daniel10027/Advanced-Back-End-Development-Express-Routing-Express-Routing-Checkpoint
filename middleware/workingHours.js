/**
 * Autorise uniquement du lundi au vendredi, 09:00 <= heure < 17:00 (heure du serveur).
 * Si hors plage, rend une page "closed".
 */
module.exports = function workingHours(req, res, next) {
    const now = new Date(); // heure locale du serveur
    const day = now.getDay(); // 0=Dim ... 1=Lun ... 5=Ven ... 6=Sam
    const hour = now.getHours(); // 0..23

    const isWeekday = day >= 1 && day <= 5;
    const isWorkingHour = hour >= 9 && hour < 17;

    if (isWeekday && isWorkingHour) return next();

    // Autoriser l'accès aux assets (CSS/IMG) si la route commence par /public
    if (req.path.startsWith("/public/")) return next();

    // Sinon, afficher la page "closed"
    res.status(403).render("pages/closed", {
        title: "Closed",
        now: now.toLocaleString(),
        window: "Monday to Friday, 09:00–17:00"
    });
};