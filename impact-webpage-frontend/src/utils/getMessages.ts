const getMessages = async (locale: string) => {
  try {
    const messages = await import(`../locales/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    return {};
  }
};

export { getMessages };
