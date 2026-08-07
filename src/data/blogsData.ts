export type Blog = {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    read_time: string;
    date: string;
    author_name: string;
    author_role: string;
    author_avatar: string;
    image_url: string;
};

export const blogsData: Blog[] = [
    {
        id: 1,
        slug: "7-silent-mistakes-killing-shopify-store-sales",
        title: "7 Silent Mistakes That Are Killing Your Shopify Store’s Sales (And How to Fix Them Today)",
        excerpt: "Most Shopify stores are built around a product that is not inherently shoppable. Discover the 7 most common mistakes killing your conversion rates and practical fixes to boost sales today.",
        category: "Listing Optimization",
        read_time: "6 min read",
        date: "August 1, 2026",
        author_name: "Arpit Chaubey",
        author_role: "Founder, Braniva",
        author_avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=arpit",
        image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        content: `You’ve built a Shopify store. You’ve designed the products to be eye-catching. You spend hours on the logo. You run a couple ads here and there.

What gives? Why aren’t your sales taking off?

Most Shopify stores are built around a product that is not inherently shoppable, so we have to nudge customers into buying it, making returns, and becoming brand advocates. Here are the 7 most common Shopify store mistakes, along with some easy-to-implement fixes to help boost Shopify sales, without burning a hole in your pocket.

### Mistake #1: Your homepage doesn’t answer 3 important questions in 3 seconds

Most customers decide within 3 seconds of landing on your page if they want to explore your page further. If your homepage banner says ‘Welcome To Our Store’, you have already lost half your visitors.

Fix: Make sure your first page answers the following questions:
- What do you sell?
- Who is it for?
- Why should I trust you?

A well-worded headline, one prominent picture, and a hook are better than trying to wow your visitor with flashy graphics on the first page. It’s a classic example of “Don’t bore them on the front door”.

### Mistake #2: Your Shopify store is not optimized for speed

A one-second delay on your web pages can cause a noticeable drop in your conversion rate. This is especially the case for Shopify stores. Many Shopify merchants use high-end themes, too many apps, and don’t optimize images.

Fix: Optimize images before uploading them to Shopify, delete apps not in active use, and use a simple but elegant theme.

### Mistake #3: Checkout process is complicated

Every step you force customers to take before completing a purchase can result in them leaving your site. It might be a phone number verification, an email subscription prompt, a shipping address form, or a payment processor preference. Whatever it is, it can impact your Shopify store’s ability to convert.

Fix: Minimize the number of steps to checkout. Encourage customers to checkout as guests and autofill their information if possible. Simplifying the checkout process can have a significant impact on your sales.

### Mistake #4: Lack of trust signals on critical pages

Most consumers are skeptical of buying from unknown sellers. If your customers land on a product page with no visible return/refund policy, star ratings, or contact information, a lot of them will be hesitant to take action, especially at the point of purchase.

Fix: Display star ratings, customer testimonials (with photos, if possible), return/refund policy, and contact details on all relevant pages. Having trust signals can help with conversions and reduce cart abandonment.

### Mistake #5: Product description focuses on characteristics, not benefits

If you list down all the features your product offers and not the benefits it provides, you will fail to convince your customers to buy it.

Most people don’t care about characteristics, they care about the benefits. Unless you’re selling to other companies, your customers want to know what solving their problem looks like.

Fix: Always write the benefits alongside the characteristics. Use the ‘pain point – benefit’ formula. ‘180 GSM Cotton’ becomes ‘180 GSM – thick enough to last 100+ washes’.

### Mistake #6: Focusing only on ads and not on branding

Google and Meta ads will get you customers, but branding keeps them coming back. Most first-time Shopify store owners make the mistake of putting all their money into acquiring customers without spending enough time on branding.

Fix: Focus on creating a brand identity (using colors, font, and tone of voice) that is consistent across your website and social media platforms. Invest in creating a compelling ‘About’ page and brand packaging.

### Mistake #7: Not tracking and analyzing traffic sources

If you don’t track and analyze your traffic sources, you could be wasting your money on channels that are unprofitable. In most cases, new store owners continue to invest in advertising without tracking which traffic source is paying off and which is not.

Fix: Set up some basic analytics and track which channel brings you the most customers versus the least. You can then shift your ad budget accordingly and optimize your underperforming channels. If you use WordPress, you can start with their inbuilt analytics and a free tool called Meta Pixel.

### Summary

If you’ve been struggling with low sales on your Shopify store, there is likely a combination of these 7 mistakes impacting your ability to convert. Most Shopify stores don’t need a complete overhaul. They need some tactical tweaking and small adjustments to their current Shopify setup to see improvement.

If you don’t know where to start or need help optimizing your store for higher sales, Braniva can help. From onboarding to performance marketing strategy refinement, Braniva operates as a 360-degree growth partner, helping brands grow their presence on marketplaces, manage their storefronts, and run performance marketing campaigns that are grounded in research and data.

Your homework for the week: go through the 7-step Shopify store optimization checklist as a first-time customer and see how long it takes you to know what the store sells. If it takes longer than 3 seconds, you already know what to do!`
    },
    {
        id: 2,
        slug: "complete-beginners-guide-to-onboarding-brand-on-amazon-flipkart",
        title: "The Complete Beginner's Guide to Onboarding Your Brand on Amazon, Flipkart & Other Marketplaces",
        excerpt: "A complete guide to listing your brand correctly on Amazon, Flipkart, and other marketplaces. Learn what documents are required, how to optimize listings, and fight for the buy box.",
        category: "Marketplace Onboarding",
        read_time: "7 min read",
        date: "July 25, 2026",
        author_name: "Arpit Chaubey",
        author_role: "Founder, Braniva",
        author_avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=arpit",
        image_url: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
        content: `So you've decided to sell your products on Amazon or Flipkart. Great decision - as these are marketplaces where a large percentage of India's online consumers already shop and are ready to pay.

But how to get your brand listed correctly? What to do so that your brand can beat other similar products in a price war? Let's talk about what steps need to be taken for correct onboarding in marketplaces and what mistakes beginners usually make.

### 1. Preparing documents and account settings (the boring but necessary stage)

Marketplaces require specific steps to be taken before a seller account can be opened. First of all, this includes providing documents: PAN, GST, details of the bank account where the funds from sales will be transferred, and other data specific to a particular marketplace. For example, some marketplaces require additional approvals for certain categories of goods (beauty, electronics, food).

A small typo in the PAN or GST details can delay the entire account opening process for several weeks. Therefore, it is crucial to carefully check the provided information against the documents.

Another common mistake is that the company name is indicated differently in the PAN and GST certificates. Although this seems like a minor detail, the marketplaces' automated systems are very strict about this, and applications are often rejected because of this.

### 2. Listing creation and optimization: product description

The description of the product is made up of five key elements, which perform specific functions and must be optimized:

1. Title: it is the name of the product, which appears in search requests. It should include the "main keyword", the brand name, and specify at least two or three additional characteristics (for example, size, color, material).
2. Photos: a picture speaks louder than a thousand words, so this element is extremely important. The main photo should be of high quality, preferably on a white background, and there should also be photos showing the features of the product (waterproof zipper, adjustable straps, and so on). It is better to use 5-6 photos so that the buyer gets an overview of the product.
3. Bullet points: here, a marketer needs to describe the benefits (and not the characteristics) of the product, using relevant keywords. An example: "Waterproof zipper" can be described as "Waterproof zipper - protects phones and documents from rain."
4. Description: this is the place where the seller can convince the buyer of the quality of the product and highlight any advantages that the competitor's product may not have. This is especially important if, for example, the product is of average quality and the competition is high.
5. Keywords in the back of the description: Many sellers ignore this element, thinking that no one will see these words. However, these are the search terms that the marketplace uses to find relevant products for buyers, so it's worth using them.

### 3. Keyword and catalog optimization: finding the right keywords

Many sellers make a cardinal mistake when selecting keywords for their catalog: they do not study demand and the search engine of the marketplace. However, it works roughly similar to Google: if a buyer searches for a particular term, the marketplace has to find products that match this term. Therefore, choosing the right keywords for the description of the product is crucial.

How to do this? Simply type the name of the product (or the desired keyword) in the search engine of the chosen marketplace, and look at the suggestions that appear. These are real search terms used by buyers, so it makes sense to use them in the product description.

### 4. Price: how to fight for the "buy box"

On Amazon, and other marketplaces, there is a mechanism called the "buy box", which is a default option when a buyer can purchase a product. Different factors affect it, including the seller's rating, product price, delivery speed, and stock. On Amazon, it is often the price that affects the "buy box": if two sellers have roughly the same characteristics but one has a lower price, buyers will choose them.

However, this does not mean that the cheapest product always wins. Sometimes a seller with a higher price but excellent ratings and faster delivery can beat the competition.

### 5. Reviews: how to encourage buyers

Unlike a personal website, on a marketplace, a seller cannot directly communicate with a buyer and tell them about the amazing quality of their product. Here, product reviews come to the fore as a tool for conversion. In most cases, a product with 50 reviews with a rating of 4.3 will beat a product with 0 reviews and a 5.0 rating.

Therefore, based on this, we can conclude that buyers choose products based on reviews rather than just price. However, it is essential to know that most marketplaces prohibit sellers from paying for reviews or requesting them directly. Therefore, it is best to contact buyers personally and ask them to leave a review after the product has been delivered.

### 6. Paid advertising: what to do and when

Many sellers make the mistake of launching advertising campaigns right after they create their listing. However, there is nothing to advertise if there are no photos, description, or reviews. Therefore, it is essential to optimize your catalog first and then spend money on promoting it.

### Conclusion

When choosing a marketplace for selling goods, entrepreneurs should understand that the onboarding process consists of many steps. Some of them are long-term and boring, like optimizing product listings. However, this is the only way to achieve sustainable sales growth. The most critical aspect here is the listing itself, which is the basis for increasing sales.

Many beginner sellers try to attract customers using only their knowledge and skills, without the help of professionals. However, this approach is usually not very fruitful, given the complexity and specificity of the task. Fortunately, companies like Braniva offer e-commerce management services and take care of cataloging and product listing optimization so that the entrepreneur can focus their efforts on the development of the product itself.`
    },
    {
        id: 3,
        slug: "performance-marketing-explained-like-youre-hearing-it-for-first-time",
        title: "Performance Marketing Explained Like You're Hearing It for the First Time",
        excerpt: "Delve deep into what performance marketing really is, how channels like Meta & Google ads work, ROAS metrics, testing phases, and common costly mistakes D2C brands make.",
        category: "Marketing Strategy",
        read_time: "8 min read",
        date: "July 18, 2026",
        author_name: "Arpit Chaubey",
        author_role: "Founder, Braniva",
        author_avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=arpit",
        image_url: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80",
        content: `If you've interacted with a marketing agency before, you're likely to have come across the term "performance marketing" - and, more often than not, that's as far as the explanation goes. Most business owners nod their heads at some level, and move on - only to do a google search on the topic shortly thereafter.

Let's delve deeper into what performance marketing is, and more importantly, how it works.

### Understanding performance marketing

Performance marketing is marketing that is paid for on a performance-based i.e. results-oriented basis, as opposed to a cost-based (how much you pay for an ad) or impression-based (how many people are exposed to the ad) basis.

Compare this to traditional marketing, where you pay a certain price for a certain output (a newspaper ad that costs $1000 that might have a reach of 100,000 or 10,000 people).

Performance marketing, on the other hand, is all about results; a business only pays for a marketing campaign when a certain action is done, like viewing the ad, clicking on the ad, registering on the business's website, or purchasing from the business's website. It's all about tracking, and the ability to know exactly when and where the business is getting value.

### What are performance marketing channels?

Some of the most common performance marketing channels and how they're used:

#### Meta (Facebook/Instagram) ads
This is one of the most popular performance marketing channels available, ideal for businesses that sell visually arresting, attractive products like clothing, personal care items and cosmetics, food items and so on. Marketers can also target potential customers on very specific criteria such as age, gender and interests to help their ads reach the most relevant people.

#### Google ads
These are very useful for getting customers to view a particular business's website when they're searching for relevant terms or phrases, like a particular type of item ("buy running shoes online").

#### Marketplace ads (Amazon/Flipkart-sponsored products)
These are similar to Google ads, although these target people who are already on an e-commerce marketplace and looking to purchase items as well. These usually have a higher conversion rate than other channels since users are ready to spend money as well.

#### Influencer and Affiliate marketing
These aren't typically performance marketing activities, but some influencer and affiliate marketers operate on a performance-based system where money is paid depending on sales figures. This makes them fall under performance marketing as well.

### "Performance marketing" does NOT always mean "fast results"

One of the main misconceptions about performance marketing is that results should be quick and visible shortly after starting a campaign.

A lot of performance marketing campaigns go through three phases:
- A testing phase (which could last up to 2 weeks) where several different types of ads are tested out in small batches to see what works best. (These campaigns may seem to be unproductive or "bad" at this point, but it's a crucial step.)
- An optimization phase where the marketing budget is shifted towards the ad type that is performing best, with costs per sale or engagement gradually dropping.
- A scaling phase, where the ad budget is increased to make the most out of the ad type that's performing best.

Businesses that pull out their ads too early (during the testing phase) often miss out on seeing results.

### The all-important ROAS metric

ROAS stands for Return On Ad Spend, and is an important metric that indicates how much revenue a business earns for every buck that goes into the marketing/ad budget.

A ROAS of 3, for instance, means that a business makes ₹3 for every ₹1 that goes into its ad budget.

However, a ROAS of 3 may not always be that great. That mainly depends on what the business's profit figures are - if a business only makes ₹1 for every ₹1 that goes into producing its goods/services, a ROAS of 3 would mean that the business is only breaking even. Businesses should focus on improving their ROAS figures to be higher than their profit margins.

### Other common performance marketing mistakes

- Fluctuating budgets, especially turning ads on and off at various points. This resets the "learning phase" of the ads and leads to wasted money.
- Changing ad creatives too frequently - give the ads enough time (a few days) to show results before making any changes.
- Using the wrong landing page - if users are being directed to a poor-quality landing page that doesn't perform well, it'll negatively affect the performance of the ad, no matter how good it is.
- Neglecting retargeting campaigns. Most people aren't likely to make a purchase the first time they land on a website. A retargeting campaign can be a great way to remind them what they're missing out on, and it's one of the most cost-effective types of ads available.

### In conclusion

Performance marketing isn't a magic wand, and while it should be able to provide you with quantifiable results, it isn't always as straightforward as throwing more money into an ad and seeing results. It takes time for ads to optimize before they see significant gains, and it takes a keen eye to assess whether an ad's performance is worth further investment. However, businesses that do put in the work and utilise performance marketing effectively (without falling for the various pitfalls associated with it) are likely to see good results from such campaigns.

It's also important to note that the sheer amount of testing and performance tracking involved in performance marketing campaigns can be time-consuming, and if a business finds itself spending too much time on it while not getting the results it wants, a performance marketing partner like Braniva can build these ads for you, utilise real-time data and tweak and optimise your ads for better results so you can focus on other core aspects of your business.`
    },
    {
        id: 4,
        slug: "why-do-some-small-brands-feel-so-trustworthy",
        title: "Why Do Some Small Brands Feel So Trustworthy?",
        excerpt: "Why do small brands with comparable budgets speak different languages? Discover the 6 crucial principles of consistency, storytelling, presentation, and authenticity that build customer trust.",
        category: "Marketing Strategy",
        read_time: "6 min read",
        date: "July 10, 2026",
        author_name: "Arpit Chaubey",
        author_role: "Founder, Braniva",
        author_avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=arpit",
        image_url: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&w=1200&q=80",
        content: `Have you ever seen some unknown (to you) Instagram accounts or website pages and immediately gotten the feeling of who these brands are? While the first one seems to be trustworthy and professional, the second one gives the exact opposite impression.

Why is that so? Why do these seemingly similar small brands, with roughly comparable budgets and target audiences, speak different languages? The reason is brand identity - and today we will discuss why it is so important and how you can improve it.

### 1. Inconsistency kills creativity

The most evident sign of a low-quality brand is inconsistency. It shows in different colors and fonts within one website or social media account, different tones of voice in various posts, or even contrasting looks in your office and on your website. While big brands seem creative and unique, they actually follow one rule: consistency.

Regardless of your branding being creative or boring, make sure that it is consistent across all your platforms.

Do this:
- Select 2-3 standard colors and 1-2 standard fonts and use them everywhere.
- Define your brand tone of voice; it could be playful and cheeky, sincere and premium, or any other combination you like - just keep it the same across all your posts.
- If your website has a certain look and feel, make sure that your product packaging aligns with it.

### 2. Storytelling is more important than standard "about us"

A dull "About us" page with generic and unsubstantial statements will not inspire trust in your audience. Most of the time, vague positivity and non-specific claims do not resonate with anyone since people want to connect to real stories and specific examples.

Do this:
- Instead of positioning your brand as an abstract entity that cares about customer satisfaction, try to put across a deeper message of who you are and what exactly you stand for.
- Tell a story about how and why your brand was created. If it was created to solve a personal problem, highlight this fact and mention what the said problem was.
- Be specific and authentic. Nobody wants to hear another "We care about our customers" when shopping on a poorly optimized site.

### 3. Presentation matters

When it comes to small brands, their packaging often serves as the sole point of contact with the audience. Unbranded tissue paper, courier bags with printed receipt, and other generic packing materials usually leave little to no impression on the buyer. However, a carefully selected gift box, an accompanying thank-you note, or a special discount for the next purchase can strengthen the customer's perception of the brand's value.

Do this:
- Try to make the opening of the package an emotionally engaging experience for the buyer.
- Make sure that every piece of your packing reinforces your brand image and gives a positive impression.
- You need not spend much money on special packing materials to do that; a small label on a regular box and a handwritten thank-you note would be sufficient.
- Remember that presentation also includes other parts of the customer journey. Use high-quality product photos and meaningful copy to create the impression of professionalism.

### 4. Let your audience know what other people say about you

Word of mouth and recommendations are crucial in e-commerce since people trust other buyers more than businesses. However, this factor is significantly underutilized by small brands since their "reviews" section usually consists of 3 unsorted comments on a social media post.

Do this:
- Showcase your best customer reviews right on your website and social media accounts.
- Dedicate separate Instagram Stories to customer feedback. Moreover, you can also add photos of your buyers with your products.
- If you have any media coverage, awards, or strategic partnerships, make sure to promote them on your website.

### 5. Be yourself!

Customers can clearly see when a brand account posts generic comments or responds to complaints with the same boring message every single time.

Being authentic and original in your comments and DM responses will get you significant brownie points with the audience.

Do this:
- Your social media account should have a clear character and be able to communicate with the audience like a real person.

If you want a more elaborate example: while some companies outsource their social media management to external parties, these professionals should know what they are doing in terms of brand positioning. If they misunderstand your brand, it will be evident from their generic and unsubstantial replies to comments and questions.

### 6. First impressions are critical

A customer will barely spend more than 5 seconds on your website before deciding whether to stay or leave. During these 5 seconds, their brain will process the information it sees on your website and form a first impression of your brand. Inevitably, a poorly optimized website with a chaotic layout and unclear design will fail to inspire trust in the visitor.

Do this:
- Put more effort into the appearance of your website.
- Always prioritize whitespace, relevant high-quality images, and a clean design over flashy animations and loud colors.

### The final thoughts

Overall, building brand identity is not rocket science. It can be done without hiring an expensive agency and investing hundreds of hours into branding research. With that said, brand positioning should be consistent across all media and platforms, which can be overwhelming for one person. Thus, it is better to outsource branding to external experts rather than trying to manage it alone.

This is where companies like us come to the rescue: we specialize in brand development, providing end-of-line solutions, optimizing your visual identity, creating compelling copy, and fine-tuning your website's appearance and performance.`
    }
];
