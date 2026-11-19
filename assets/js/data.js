/**
 * دیوارگالری — داده‌های کاتالوگ کاغذ دیواری
 * هر محصول در هر ۵ بعد دسته‌بندی برچسب‌گذاری شده است.
 */
const CATALOG = {
  brand: {
    name: 'دیوارگالری',
    tagline: 'هنر دیوار، اصالت فضا',
    phone: '۰۲۱-۸۸۷۷۶۶۵۵',
    email: 'info@divargallery.ir',
    address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳۴'
  },

  categories: {
    albums: {
      id: 'albums',
      title: 'آلبوم‌ها',
      slug: 'albums',
      description: 'مجموعه‌های اختصاصی کروم، وایت و داگلاس — هر آلبوم زبان بصری متفاوتی دارد.',
      subcategories: [
        { id: 'chrome', title: 'کروم', slug: 'chrome' },
        { id: 'white', title: 'وایت', slug: 'white' },
        { id: 'douglas', title: 'داگلاس', slug: 'douglas' }
      ]
    },
    space: {
      id: 'space',
      title: 'فضا',
      slug: 'space',
      description: 'کاغذ دیواری متناسب با کاربری فضا — اداری، رسمی و مسکونی.',
      subcategories: [
        { id: 'office', title: 'اداری', slug: 'office' },
        { id: 'formal', title: 'رسمی', slug: 'formal' },
        { id: 'residential', title: 'مسکونی', slug: 'residential' }
      ]
    },
    location: {
      id: 'location',
      title: 'موقعیت',
      slug: 'location',
      description: 'انتخاب طرح بر اساس اتاق و موقعیت نصب در پروژه.',
      subcategories: [
        { id: 'bedroom', title: 'اتاق خواب', slug: 'bedroom' },
        { id: 'living', title: 'پذیرایی', slug: 'living' },
        { id: 'kitchen', title: 'آشپزخانه', slug: 'kitchen' },
        { id: 'bathroom', title: 'حمام', slug: 'bathroom' },
        { id: 'hallway', title: 'راهرو', slug: 'hallway' },
        { id: 'kids', title: 'اتاق کودک', slug: 'kids' }
      ]
    },
    color: {
      id: 'color',
      title: 'رنگ',
      slug: 'color',
      description: 'پالت رنگی گسترده — از سادگی سفید تا عمق مشکی و درخشش طلایی.',
      subcategories: [
        { id: 'blue', title: 'آبی', slug: 'blue' },
        { id: 'green', title: 'سبز', slug: 'green' },
        { id: 'beige', title: 'بژ', slug: 'beige' },
        { id: 'gray', title: 'خاکستری', slug: 'gray' },
        { id: 'white', title: 'سفید', slug: 'white' },
        { id: 'gold', title: 'طلایی', slug: 'gold' },
        { id: 'black', title: 'مشکی', slug: 'black' }
      ]
    },
    pattern: {
      id: 'pattern',
      title: 'طرح',
      slug: 'pattern',
      description: 'از سادگی مینیمال تا پیچیدگی کلاسیک — هر طرح شخصیت فضا را می‌سازد.',
      subcategories: [
        { id: 'plain', title: 'ساده', slug: 'plain' },
        { id: 'geometric', title: 'هندسی', slug: 'geometric' },
        { id: 'floral', title: 'گل‌دار', slug: 'floral' },
        { id: 'classic', title: 'کلاسیک', slug: 'classic' },
        { id: 'modern', title: 'مدرن', slug: 'modern' },
        { id: 'textured', title: 'بافت‌دار', slug: 'textured' }
      ]
    }
  },

  products: [
    {
      code: '511',
      title: 'کروم آبی اداری',
      description: 'بافت فلزی کروم با هاله آبی سرد — مناسب فضاهای اداری و پذیرایی مدرن. مقاومت بالا در برابر سایش.',
      image: 'texture-chrome-blue.jpg',
      tags: { albums: 'chrome', space: 'office', location: 'living', color: 'blue', pattern: 'geometric' }
    },
    {
      code: '512',
      title: 'وایت هندسی مسکونی',
      description: 'سفید مات با نقش هندسی ظریف — آرامش‌بخش برای اتاق خواب و فضاهای مینیمال.',
      image: 'texture-white-geometric.jpg',
      tags: { albums: 'white', space: 'residential', location: 'bedroom', color: 'white', pattern: 'geometric' }
    },
    {
      code: '513',
      title: 'داگلاس بژ پذیرایی',
      description: 'الهام از بافت چوب داگلاس — گرمای طبیعی برای پذیرایی و فضاهای رسمی.',
      image: 'texture-douglas-wood.jpg',
      tags: { albums: 'douglas', space: 'formal', location: 'living', color: 'beige', pattern: 'plain' }
    },
    {
      code: '514',
      title: 'سبز گل‌دار کلاسیک',
      description: 'سبز زمردی با نقش گیاهی کلاسیک — لوکس و چشم‌نواز برای پذیرایی رسمی.',
      image: 'texture-green-botanical.jpg',
      tags: { albums: 'white', space: 'formal', location: 'living', color: 'green', pattern: 'floral' }
    },
    {
      code: '515',
      title: 'آبی بافت‌دار اداری',
      description: 'آبی نفتی با بافت برجسته ظریف — حرفه‌ای و متمرکز برای دفاتر اداری.',
      image: 'texture-blue-formal.jpg',
      tags: { albums: 'chrome', space: 'office', location: 'hallway', color: 'blue', pattern: 'textured' }
    },
    {
      code: '516',
      title: 'بژ ساده اتاق خواب',
      description: 'بافت کتان بژ — لطیف و خنثی، ایده‌آل برای اتاق خواب و استراحت.',
      image: 'texture-beige-linen.jpg',
      tags: { albums: 'white', space: 'residential', location: 'bedroom', color: 'beige', pattern: 'plain' }
    },
    {
      code: '517',
      title: 'مشکی طلایی آرت‌دکو',
      description: 'الگوی آرت‌دکو مشکی و طلایی — درخشان و باشکوه برای فضاهای رسمی.',
      image: 'texture-black-gold-deco.jpg',
      tags: { albums: 'douglas', space: 'formal', location: 'living', color: 'black', pattern: 'classic' }
    },
    {
      code: '518',
      title: 'کروم خاکستری رسمی',
      description: 'کروم خاکستری براق — مدرن و مقاوم برای لابی‌ها و فضاهای رسمی.',
      image: 'texture-chrome-blue.jpg',
      tags: { albums: 'chrome', space: 'formal', location: 'hallway', color: 'gray', pattern: 'modern' }
    },
    {
      code: '519',
      title: 'وایت ساده آشپزخانه',
      description: 'سفید یکدست و ضد رطوبت — تمیز و روشن برای آشپزخانه مدرن.',
      image: 'texture-white-woven.jpg',
      tags: { albums: 'white', space: 'residential', location: 'kitchen', color: 'white', pattern: 'plain' }
    },
    {
      code: '520',
      title: 'داگلاس سبز راهرو',
      description: 'ترکیب چوب داگلاس با تن سبز ملایم — گرم و دلنشین برای راهرو.',
      image: 'texture-douglas-wood.jpg',
      tags: { albums: 'douglas', space: 'residential', location: 'hallway', color: 'green', pattern: 'plain' }
    },
    {
      code: '521',
      title: 'طلایی کلاسیک رسمی',
      description: 'بافت طلایی براق با نقش کلاسیک — مناسب سالن‌های پذیرایی لوکس.',
      image: 'texture-gold-damask.jpg',
      tags: { albums: 'douglas', space: 'formal', location: 'living', color: 'gold', pattern: 'classic' }
    },
    {
      code: '522',
      title: 'آبی هندسی اتاق کودک',
      description: 'آبی روشن با اشکال هندسی بازیگوش — شاد و ایمن برای اتاق کودک.',
      image: 'texture-blue-formal.jpg',
      tags: { albums: 'white', space: 'residential', location: 'kids', color: 'blue', pattern: 'geometric' }
    },
    {
      code: '523',
      title: 'خاکستری بافت‌دار اداری',
      description: 'خاکستری تیره با بافت برجسته — متمرکز و حرفه‌ای برای اتاق جلسات.',
      image: 'texture-gray-modern.jpg',
      tags: { albums: 'chrome', space: 'office', location: 'living', color: 'gray', pattern: 'textured' }
    },
    {
      code: '524',
      title: 'بژ گل‌دار پذیرایی',
      description: 'بژ گرم با نقش گل‌دار ظریف — رمانتیک و دلنشین برای پذیرایی.',
      image: 'texture-beige-linen.jpg',
      tags: { albums: 'white', space: 'formal', location: 'living', color: 'beige', pattern: 'floral' }
    },
    {
      code: '525',
      title: 'سبز مدرن مسکونی',
      description: 'سبز زمردی مات با حس مدرن — آرامش‌بخش برای فضاهای مسکونی.',
      image: 'texture-green-botanical.jpg',
      tags: { albums: 'chrome', space: 'residential', location: 'bedroom', color: 'green', pattern: 'modern' }
    },
    {
      code: '526',
      title: 'سفید بافت‌دار راهرو',
      description: 'سفید با بافت بافته — گسترش بصری فضا برای راهروهای باریک.',
      image: 'texture-white-woven.jpg',
      tags: { albums: 'white', space: 'residential', location: 'hallway', color: 'white', pattern: 'textured' }
    },
    {
      code: '527',
      title: 'مشکی مدرن اداری',
      description: 'مشکی عمیق با بافت مدرن — قدرتمند و مینیمال برای دفاتر مدیریتی.',
      image: 'texture-black-gold-deco.jpg',
      tags: { albums: 'chrome', space: 'office', location: 'living', color: 'black', pattern: 'modern' }
    },
    {
      code: '528',
      title: 'طلایی ساده حمام',
      description: 'طلایی ملایم و یکدست — گرما و درخشش برای حمام کلاسیک.',
      image: 'texture-gold-damask.jpg',
      tags: { albums: 'douglas', space: 'residential', location: 'bathroom', color: 'gold', pattern: 'plain' }
    },
    {
      code: '529',
      title: 'آبی کلاسیک اتاق خواب',
      description: 'آبی ملایم با الهام کلاسیک — آرامش‌بخش برای اتاق خواب.',
      image: 'texture-blue-formal.jpg',
      tags: { albums: 'white', space: 'residential', location: 'bedroom', color: 'blue', pattern: 'classic' }
    },
    {
      code: '530',
      title: 'خاکستری هندسی اداری',
      description: 'خاکستری با الگوی هندسی — حرفه‌ای و معاصر برای فضاهای اداری.',
      image: 'texture-gray-modern.jpg',
      tags: { albums: 'chrome', space: 'office', location: 'living', color: 'gray', pattern: 'geometric' }
    }
  ]
};

/** @deprecated alias for backward compatibility */
const WALLART = CATALOG;

function getSubTitle(categoryId, subId) {
  const cat = CATALOG.categories[categoryId];
  if (!cat) return subId;
  const sub = cat.subcategories.find((s) => s.id === subId);
  return sub ? sub.title : subId;
}

function productImageUrl(product, base = '') {
  return `${base}assets/images/products/${product.image}`;
}

function filterProducts(categoryId, subId = null) {
  return CATALOG.products.filter((p) => {
    if (subId) return p.tags[categoryId] === subId;
    return true;
  });
}

function findProduct(code) {
  return CATALOG.products.find((p) => p.code === String(code));
}

function productTagLabels(product) {
  return {
    albums: getSubTitle('albums', product.tags.albums),
    space: getSubTitle('space', product.tags.space),
    location: getSubTitle('location', product.tags.location),
    color: getSubTitle('color', product.tags.color),
    pattern: getSubTitle('pattern', product.tags.pattern)
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CATALOG, WALLART, getSubTitle, productImageUrl, filterProducts, findProduct, productTagLabels };
}
