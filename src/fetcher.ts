import axios from 'axios';
import * as cheerio from 'cheerio';

export async function fetchGoldPrice() {
  const url = 'https://www.goldpriceindia.com/';
  try {
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const $ = cheerio.load(data);

    const priceText = $('tr:contains("24K") td').eq(1).text().trim();
    
    const match = priceText.match(/[\d,]+/); 
    
    if (match) {
      const cleanPrice = parseInt(match[0].replace(/,/g, ''));
      console.log(`Successfully fetched 24K Gold Price: ₹${cleanPrice*10}/10g`);
      return cleanPrice;
    }
    
    return null;
  } catch (error) {
    console.error("Scraping failed:", error);
    return null;
  }
}