// utils/rateLimit.js

const MAX_GUEST_CONVERSIONS = 2;
const MAX_GUEST_FILE_SIZE_MB = 5;

export const checkRateLimit = (fileSizeInBytes) => {
  // Check File Size
  const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
  if (fileSizeInMB > MAX_GUEST_FILE_SIZE_MB) {
    return {
      allowed: false,
      reason: `File terlalu besar (${fileSizeInMB.toFixed(1)}MB). Batas tamu adalah ${MAX_GUEST_FILE_SIZE_MB}MB.`
    };
  }

  // Check Daily Conversions
  const today = new Date().toISOString().split('T')[0];
  const usageStr = localStorage.getItem('guest_usage');
  let usageData = usageStr ? JSON.parse(usageStr) : { date: today, count: 0 };

  // Reset if it's a new day
  if (usageData.date !== today) {
    usageData = { date: today, count: 0 };
  }

  if (usageData.count >= MAX_GUEST_CONVERSIONS) {
    return {
      allowed: false,
      reason: `Batas harian tamu tercapai (${MAX_GUEST_CONVERSIONS} file).`
    };
  }

  return { allowed: true };
};

export const incrementRateLimit = () => {
  const today = new Date().toISOString().split('T')[0];
  const usageStr = localStorage.getItem('guest_usage');
  let usageData = usageStr ? JSON.parse(usageStr) : { date: today, count: 0 };

  if (usageData.date !== today) {
    usageData = { date: today, count: 0 };
  }

  usageData.count += 1;
  localStorage.setItem('guest_usage', JSON.stringify(usageData));
};
