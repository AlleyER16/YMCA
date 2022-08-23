const video = document.querySelector(".camera-preview");
const picture = document.querySelector(".picture");
const photoAccess = document.querySelector(".photo-access");
const take_photo_button = document.querySelector(".take-photo-btn");

let image_url = "";

const root_url = () => {
    const href = window.location.href;
    const root_url = href.substring(0, href.lastIndexOf("/")) + "/";

    console.log(root_url);

    return root_url;
};

const start_camera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    });
    video.srcObject = stream;
};

start_camera();

take_photo_button.addEventListener("click", function () {
    picture
        .getContext("2d")
        .drawImage(video, 0, 0, picture.width, picture.height);
    let image_data_url = picture.toDataURL("image/jpeg");

    $.ajax({
        type: "POST",
        data: {
            image: image_data_url,
            type: photoAccess.checked ? "public" : "private",
        },
        url: "booth/__upload__.php",
        success: function (data) {
            image_url = `${root_url()}booth/${data}`;

            $(".camera").css("display", "none");

            $(".image-preview").attr("src", image_url);
            $(".photo-preview-box").css("display", "block");
        },
    });
});

$("#file-upload-btn").click(function (e) {
    $("#file-upload").trigger("click");
});

$("#file-upload").change(function (e) {
    const [file] = e.target.files;

    if (file) {
        $("#file-upload-btn").html(
            `<span class="fas fa-spinner fa-spin"></span> Uploading...`
        );

        const form_data = new FormData();

        form_data.append("type", photoAccess.checked ? "public" : "private");
        form_data.append("image", file);

        $.ajax({
            type: "POST",
            data: form_data,
            url: "booth/__upload_file__.php",
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.message === "File uploaded successfully") {
                    image_url = `${root_url()}booth/${data.file_path}`;

                    $(".camera").css("display", "none");

                    $(".image-preview").attr("src", image_url);
                    $(".photo-preview-box").css("display", "block");
                } else {
                    alert(data.message);
                }
                $("#file-upload-btn").html("Upload from device");
            },
        });
    }

    e.target.value = null;
});

const copy_image_url = async () => {
    await navigator.clipboard.writeText(image_url);
    alert("File link copied to clipboard successfully");
};

const reset_booth = () => {
    $(".camera").css("display", "block");
    $(".photo-preview-box").css("display", "none");
};
