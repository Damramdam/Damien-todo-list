$(function() {
    // gestion evenement du bouton ajouter
    $("#add-submit").click(function() {
        // on récupère les données du formulaire
        var form = $("#add-form");
        var formData = $(form).serialize();
        // quand l'utilisateur clique
        form.submit(function(event) {
            event.preventDefault(); 
            $.ajax({
                data: formData, // on remplit la requete ajax
                url: "php/action.php", 
                success: function() { // en cas de succès
                    location.reload(); // on recharge la page courante
                },
                error: function() { // en cas d'erreur un message est généré
                    
                    location.reload(); // On recharge la page courante
                }
            });
        });
    });
    
    // gestion evenement du bouton modifier
    $(".tasks-table").on("click", ".btn-edit", function() {
        var id = $(this).val(); // on récupère l'ID (valeur du bouton)

        var dateID = "#date-" + id;
        var contentID = "#task-content-" + id;

        var date = $(this).closest("tr").children(dateID).text();
        date = date.replace(/\s/g, "T");
        var content = $(this).closest("tr").children(contentID).text();

        console.log(date);
        console.log(content);

        document.getElementById("edit-content").value = content;
        document.getElementById("edit-date").value = date;
        document.getElementById("edit-id").value = id;

        var modal = document.getElementById("editmodal");
        var span = document.getElementsByClassName("close")[0];

        modal.style.display = "block";

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        $("#edit-submit").click(function() {
            var form = $("#edit-form");
            var formData = $(form).serialize();
            console.log(formData);

            form.submit(function(event) {
                event.preventDefault(); 

                $.ajax({
                    data: formData, // on remplit la requete ajax
                    url: "php/action.php", // Script à utiliser
                    success: function() { // en cas de succès
                        location.reload(); // On recharge la page courante
                    },
                    error: function(data) { // en cas d'erreur un message est généré
                        location.reload(); // On recharge la page courante
                    }
                });
            });
        });
    });

    // gestion evenement du bouton supprimer
    $(".tasks-table").on("click", ".btn-delete", function() {
        // sécurité: l'utilisateur veut-il vraiment effacer ?
        if (confirm("Voulez-vous vraiment supprimer ces données?")) {
            var action = "remove"; // on remplit la variable action pour informer l'AJAX du souhait de supprimer
            var id = $(this).val(); //  on récupère l'ID (valeur du bouton)
            $.ajax({
                data: { 
                    action: action,
                    id: id
                },
                url: "php/action.php" // script à utiliser
            });
            location.reload();
        }
    });
});