// Ajax post request
$("#new-note-form").submit((event) => {
  event.preventDefault();
  let newNoteData = $("#new-note-textarea").val();
  console.log(newNoteData);
  $.post({
    url: "/api/notes",
    data: { note: newNoteData },
  }).done(() => {
    window.location.reload();
  });
});

// Ajax delete request
$(".delete-btn").click((event) => {
  let index = $(event.target).closest("form").attr("id");
  $.ajax({
    url: `api/notes/${index}`,
    type: "DELETE",
  }).done(() => {
    window.location.reload();
  });
});

// Ajax put request
$(".editor-btns").hide();

$(".old-note-textarea").click((event) => {
  $(event.target).siblings(".editor-btns").show();
  let oldNote = $(event.target).val();

  $(".save-btn").click((e) => {
    let index = $(e.target).closest("form").attr("id");
    let editNoteData = $(e.target).closest("form").find("textarea").val();
    $.ajax({
      url: `/api/notes/${index}`,
      type: "PUT",
      data: { note: editNoteData },
    }).done(() => {
      window.location.reload();
    });
  });

  $(".return-btn").click((e) => {
    $(e.target).closest("form").find("textarea").val(oldNote);
  });
});
