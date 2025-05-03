
// src/app/terms/page.tsx

export default function TermsOfServicePage() {
    const lastUpdated = "August 1, 2024"; // Update this date when changes are made
    const websiteUrl = "https://www.estateagency.ng"; // Replace with actual URL
    const companyAddressLine1 = "10 Saka Tinubu Street";
    const companyCityStateZip = "Victoria Island, Lagos";
    const companyCountry = "Nigeria";

    return (
        <div className="container py-12 md:py-16 max-w-4xl mx-auto prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:underline">
            <h1 className="text-center mb-8">Terms of Service</h1>
            <p className="text-center text-muted-foreground">Last Updated: {lastUpdated}</p>

            <h2>1. AGREEMENT TO TERMS</h2>
            <p>
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Estate Agency ("<strong>Company</strong>," “<strong>we</strong>,” “<strong>us</strong>,” or “<strong>our</strong>”), concerning your access to and use of the {websiteUrl} website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
            </p>
             <p>
                You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Service. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
            </p>

            <h2>2. INTELLECTUAL PROPERTY RIGHTS</h2>
            <p>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of Nigeria, international copyright laws, and international conventions.
            </p>

            <h2>3. USER REPRESENTATIONS</h2>
            <p>By using the Site, you represent and warrant that:</p>
            <ol>
                <li>All registration information you submit (if any) will be true, accurate, current, and complete;</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
                <li>You have the legal capacity and you agree to comply with these Terms of Service;</li>
                <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise, except for standard search engine indexing;</li>
                <li>You will not use the Site for any illegal or unauthorized purpose;</li>
                <li>Your use of the Site will not violate any applicable law or regulation in Nigeria or your jurisdiction.</li>
            </ol>

            <h2>4. PROHIBITED ACTIVITIES</h2>
             <p>
                You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
             </p>
            <p>As a user of the Site, you agree not to:</p>
            <ul>
                <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords (if applicable).</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Site.</li>
                <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.</li>
                <li>Use any information obtained from the Site in order to harass, abuse, or harm another person.</li>
                 <li>Use the Site in a manner inconsistent with any applicable laws or regulations.</li>
                 <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material that interferes with any party’s uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site.</li>
                 {/* Add more prohibited activities as relevant */}
            </ul>

            <h2>5. SITE MANAGEMENT</h2>
             <p>
                We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Service; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Service; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions (if applicable) or any portion thereof; (4) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.
            </p>

            <h2>6. TERM AND TERMINATION</h2>
            <p>
                These Terms of Service shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON.
            </p>


             <h2>7. MODIFICATIONS AND INTERRUPTIONS</h2>
            <p>
                We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Site without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
            </p>
             <p>
                We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Site at any time or for any reason without notice to you.
            </p>

            <h2>8. GOVERNING LAW</h2>
            <p>
                 These Terms shall be governed by and defined following the laws of the Federal Republic of Nigeria. Estate Agency and yourself irrevocably consent that the courts of Lagos State shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>

             <h2>9. DISCLAIMER</h2>
             <p>
                THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE’S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SITE.
             </p>

            <h2>10. LIMITATIONS OF LIABILITY</h2>
            <p>
                 IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING.
            </p>

            <h2>11. CONTACT US</h2>
            <p>
                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            </p>
            <p>
                Estate Agency<br />
                 {companyAddressLine1}<br />
                 {companyCityStateZip}<br />
                 {companyCountry}<br />
                Email: support@estateagency.ng
            </p>
        </div>
    );
}
