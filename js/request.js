
$(function() {
    var dateID;
    var contentID;
    $.ajax({
        url: "php/request.php", // script à utiliser
        success: function(data) { // en cas de succes
            $.each(data, function(i, item) { 
                dateID = "date-" + item.id;
                contentID = "task-content-" + item.id;
                $(".tasks-table").append( // on alimente la table
                    $('<tr>').append( // on alimente les balises <tr>
                        $('<td>').text(item.id), // on ajoute l'ID à la premiere <td>
                        $('<td>').attr("id", dateID).text(item.date), // on ajoute la date et l'heure à la 2ème <td>
                        $('<td>').attr("id", contentID).text(item.content), // on ajoute le contenu de l'action à la 3ème <td>
                        $('<td>').append( // on ajoute les boutons
                            $('<button class="btn-edit" value="' + item.id + '"></button><button class="btn-delete" value="' + item.id + '"></button>')
                        ) // on ferme la dernière <td>
                    ) // on ferme la <tr>
                ); 
            });
        }
    });
});