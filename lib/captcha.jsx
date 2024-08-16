export default async function createCaptcha() {
  try {
    const response = await fetch("http://api.jsonlee.cn/base/captcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
      body: JSON.stringify({}), // You can pass an empty body if the API doesn't require any specific parameters
    });

    if (!response.ok) {
      throw new Error("Failed to fetch CAPTCHA data");
    }

    const result = await response.json();

    if (!result.data || !result.data.picPath) {
      throw new Error("Invalid CAPTCHA data");
    }

    return {
      captchaId: result.data.captchaId,
      captchaLength: result.data.captchaLength,
      openCaptcha: result.data.openCaptcha,
      dataUrl: result.data.picPath, // Use picPath as the CAPTCHA image data URL
    };
  } catch (error) {
    console.error("Error fetching CAPTCHA:", error);
    return null;
  }
}