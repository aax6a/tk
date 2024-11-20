document.getElementById("downloadBtn").addEventListener("click", async () => {
    const videoUrl = document.getElementById("videoUrl").value;
    const resultDiv = document.getElementById("result");

    if (!videoUrl) {
        resultDiv.innerHTML = "<p style='color: red;'>الرجاء إدخال رابط فيديو!</p>";
        return;
    }

    try {
        const apiURL = `https://www.tikwm.com/api/?url=${encodeURIComponent(videoUrl)}`;
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data && data.data && data.data.play) {
            const videoSrc = data.data.play;

            // جلب الفيديو كـ Blob
            const videoResponse = await fetch(videoSrc);
            const videoBlob = await videoResponse.blob();

            // إنشاء رابط مؤقت للتحميل
            const videoUrl = URL.createObjectURL(videoBlob);
            const downloadLink = document.createElement("a");
            downloadLink.href = videoUrl;
            downloadLink.download = "tiktok_video.mp4"; // اسم الفيديو عند التنزيل

            // تشغيل التنزيل
            downloadLink.click();

            // تنظيف الرابط المؤقت
            URL.revokeObjectURL(videoUrl);

            resultDiv.innerHTML = "<p style='color: green;'>تم تحميل الفيديو بنجاح!</p>";
        } else {
            resultDiv.innerHTML = "<p style='color: red;'>حدث خطأ أثناء تحميل الفيديو!</p>";
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "<p style='color: red;'>تعذر الاتصال بالخادم.</p>";
    }
});
