// src/app/privacy/page.tsx

export default function PrivacyPolicyPage() {
    const lastUpdated = "August 1, 2024"; // Update this date when changes are made

    return (
        <div className="container py-12 md:py-16 max-w-4xl mx-auto prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:underline">
            <h1 className="text-center mb-8">Privacy Policy</h1>
            <p className="text-center text-muted-foreground">Last Updated: {lastUpdated}</p>

            <p>
                Welcome to EstateFindr. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at privacy@estatefindr.com.
            </p>

            <p>
                This privacy notice describes how we might use your information if you visit our website at [Your Website URL], use our mobile application, or engage with us in other related ways ― including any sales, marketing, or events (we refer to them collectively in this privacy notice as the "<strong>Services</strong>").
            </p>

            <p>
                In this privacy notice, if we refer to:
            </p>
            <ul>
                <li><strong>"Website,"</strong> we are referring to any website of ours that references or links to this policy.</li>
                <li><strong>"App,"</strong> we are referring to any application of ours that references or links to this policy, including any listed above.</li>
                <li><strong>"Services,"</strong> we are referring to our Website, App, and other related services, including any sales, marketing, or events.</li>
            </ul>

            <p>
                The purpose of this privacy notice is to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.
            </p>

            <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
            <p>
                <strong>Personal information you disclose to us:</strong> We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services (such as posting messages in our online forums or entering competitions, contests or giveaways) or otherwise when you contact us.
            </p>
            <p>
                The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make and the products and features you use. The personal information we collect may include the following: Name, Phone Number, Email Address, Mailing Address, Usernames, Passwords, Contact Preferences, Contact or Authentication Data, Billing Addresses, Debit/Credit Card Numbers, and other similar information.
            </p>
            <p>
                <strong>Information automatically collected:</strong> We automatically collect certain information when you visit, use or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
            </p>

            <h2>2. HOW DO WE USE YOUR INFORMATION?</h2>
            <p>
                We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.
            </p>
            <p>We use the information we collect or receive:</p>
            <ul>
                <li>To facilitate account creation and logon process.</li>
                <li>To post testimonials.</li>
                <li>Request feedback.</li>
                <li>To enable user-to-user communications.</li>
                <li>To manage user accounts.</li>
                <li>To send administrative information to you.</li>
                <li>To protect our Services.</li>
                <li>To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</li>
                <li>To respond to legal requests and prevent harm.</li>
                <li>Fulfill and manage your orders.</li>
                <li>Administer prize draws and competitions.</li>
                <li>To deliver and facilitate delivery of services to the user.</li>
                <li>To respond to user inquiries/offer support to users.</li>
                <li>To send you marketing and promotional communications.</li>
                <li>Deliver targeted advertising to you.</li>
                <li>For other business purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Services, products, marketing and your experience.</li>
            </ul>

             <h2>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</h2>
            <p>
                 We may process or share your data that we hold based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, Legal Obligations, Vital Interests. More specifically, we may need to process your data or share your personal information in the following situations: Business Transfers, Affiliates, Business Partners.
            </p>

             <h2>4. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
            <p>
                We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
             </p>

            <h2>5. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
            <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information.
            </p>


             <h2>6. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
             <p>
                In some regions (like the European Economic Area and the UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.
             </p>

            <h2>7. UPDATES TO THIS NOTICE</h2>
            <p>
                We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
            </p>

            <h2>8. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
            <p>
                If you have questions or comments about this notice, you may email us at privacy@estatefindr.com or by post to:
            </p>
            <p>
                EstateFindr<br />
                [Your Company Address Line 1]<br />
                [Your Company Address Line 2]<br />
                [City, State, Zip Code]<br />
                [Country]
            </p>
        </div>
    );
}
