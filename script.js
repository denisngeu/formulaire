document.getElementById("submissionForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs des champs du formulaire
    const articleTitle = document.getElementById("articleTitle").value.trim();
    const namesAffiliations = document.getElementById("namesAffiliations").value.trim();
    const abstract = document.getElementById("abstract").value.trim();
    const conferenceStartDate = new Date(document.getElementById("startDate").value);
    const conferenceEndDate = new Date(document.getElementById("endDate").value);
    const presentationDate = new Date(document.getElementById("presentationDate").value);
    const volumeIssuePages = document.getElementById("volumeIssuePages").value.trim();
    const doi = document.getElementById("doi").value.trim();
    const publisher = document.getElementById("publisher").value.trim();
    const collection = document.getElementById("collection").value.trim();
    const country = document.getElementById("country").value.trim();
    const documentFiles = document.getElementById("document").files;

    // Validation des champs obligatoires
    if (!articleTitle || !namesAffiliations || !abstract) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    // Validation des dates
    if (isNaN(conferenceStartDate) || isNaN(conferenceEndDate) || isNaN(presentationDate)) {
        alert("Veuillez entrer des dates valides.");
        return;
    }
    if (conferenceStartDate > conferenceEndDate) {
        alert("La date de début de la conférence doit être antérieure à la date de fin.");
        return;
    }
    if (presentationDate < conferenceStartDate || presentationDate > conferenceEndDate) {
        alert("La date de présentation doit être comprise entre la date de début et la date de fin de la conférence.");
        return;
    }

    // Validation des fichiers joints
    if (documentFiles.length > 3) {
        alert("Vous pouvez télécharger au maximum 3 fichiers.");
        return;
    }
    for (let i = 0; i < documentFiles.length; i++) {
        const file = documentFiles[i];
        if (!file.type.startsWith("application/") && !file.type.startsWith("image/")) {
            alert("Les fichiers joints doivent être des documents ou des images.");
            return;
        }
    }

    // Construction du mailto
    const mailtoLink = `mailto:ericdenisnguema10@gmail.com?subject=Soumission : ${encodeURIComponent(articleTitle)}&body=${encodeURIComponent(
        `Bonjour,\n\nVoici les informations de la soumission :\n\n` +
        `Titre de l'article : ${articleTitle}\n` +
        `Noms et Affiliations : ${namesAffiliations}\n` +
        `Résumé : ${abstract}\n` +
        `Date de début de la conférence : ${conferenceStartDate.toLocaleDateString()}\n` +
        `Date de fin de la conférence : ${conferenceEndDate.toLocaleDateString()}\n` +
        `Date de présentation : ${presentationDate.toLocaleDateString()}\n` +
        `Volume, Issue et Pages : ${volumeIssuePages}\n` +
        `DOI : ${doi}\n` +
        `Publisher (Éditeur) : ${publisher}\n` +
        `Collection : ${collection}\n` +
        `Pays : ${country}\n\n` +
        `Cordialement.`
    )}`;

    // Vérification de la longueur du lien mailto
    if (mailtoLink.length > 2000) {
        alert("Le contenu du mail est trop long. Veuillez réduire le texte ou contacter directement l'adresse email.");
        return;
    }

    // Ouvre le client de messagerie
    window.location.href = mailtoLink;
    alert("Votre soumission a été préparée. Vérifiez votre client de messagerie pour l'envoyer.");
});
