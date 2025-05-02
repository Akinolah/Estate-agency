// src/app/accessibility/page.tsx

export default function AccessibilityPage() {
    const lastUpdated = "August 1, 2024"; // Update this date when changes are made

    return (
        <div className="container py-12 md:py-16 max-w-4xl mx-auto prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:underline">
            <h1 className="text-center mb-8">Accessibility Statement</h1>
            <p className="text-center text-muted-foreground">Last Updated: {lastUpdated}</p>

            <p>
                EstateFindr is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>

            <h2>Conformance Status</h2>
            <p>
                The <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">Web Content Accessibility Guidelines (WCAG)</a> defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
            </p>
            <p>
                EstateFindr is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard. We are actively working towards achieving full conformance.
            </p>

             <h2>Measures Taken</h2>
             <p>EstateFindr takes the following measures to ensure accessibility:</p>
            <ul>
                <li>Include accessibility as part of our mission statement.</li>
                 <li>Integrate accessibility into our procurement practices.</li>
                 <li>Provide continual accessibility training for our staff.</li>
                 <li>Assign clear accessibility targets and responsibilities.</li>
                 <li>Employ formal accessibility quality assurance methods.</li>
                 <li>Utilize automated testing tools and manual testing by internal staff and/or third-party experts.</li>
            </ul>


             <h2>Feedback</h2>
            <p>
                 We welcome your feedback on the accessibility of EstateFindr. Please let us know if you encounter accessibility barriers:
            </p>
            <ul>
                 <li>Phone: <a href="tel:+1234567890">(123) 456-7890</a></li>
                 <li>E-mail: <a href="mailto:accessibility@estatefindr.com">accessibility@estatefindr.com</a></li>
                 <li>Visitor Address: [Your Company Address Line 1], [City, State, Zip Code]</li>
                 <li>Postal Address: [Your Company Address Line 1], [City, State, Zip Code]</li>
            </ul>
             <p>We try to respond to feedback within 5 business days.</p>

            <h2>Technical Specifications</h2>
            <p>
                Accessibility of EstateFindr relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
            </p>
             <ul>
                <li>HTML</li>
                <li>WAI-ARIA</li>
                 <li>CSS</li>
                 <li>JavaScript</li>
             </ul>
             <p>
                 These technologies are relied upon for conformance with the accessibility standards used.
            </p>

            <h2>Limitations and Alternatives</h2>
             <p>
                Despite our best efforts to ensure accessibility of EstateFindr, there may be some limitations. Below is a description of known limitations, and potential solutions. Please contact us if you observe an issue not listed below.
            </p>
             <p>Known limitations for EstateFindr:</p>
            <ul>
                <li>
                     <strong>Third-party integrations:</strong> Embedded content such as maps or virtual tours from third-party providers may not fully conform to accessibility standards. We monitor these integrations and encourage providers to improve accessibility. If you encounter issues, please contact us for alternative access to the information.
                 </li>
                 <li>
                     <strong>User-generated content:</strong> While we strive to ensure content added by users (if applicable) is accessible, we cannot guarantee the accessibility of all user-generated content.
                </li>
                {/* Add other known limitations if applicable */}
             </ul>


            <h2>Assessment Approach</h2>
            <p>
                EstateFindr assessed the accessibility of the website by the following approaches:
             </p>
            <ul>
                <li>Self-evaluation</li>
                <li>External evaluation (if applicable)</li>
                 {/* Add details about specific tools or methodologies used */}
             </ul>

             {/* Optional: Add Formal Approval Section */}
            {/*
             <h2>Formal Approval of this Accessibility Statement</h2>
             <p>
                 This Accessibility Statement is approved by:
            </p>
             <p>[Name and Title of Approving Officer]</p>
             */}

             {/* Optional: Add Formal Complaint Procedure */}
            {/*
            <h2>Formal Complaints</h2>
             <p>
                We aim to respond to accessibility feedback within 5 business days, and to propose a solution within 10 business days. You are entitled to escalate a complaint to [National Enforcement Body, if applicable], should you be dissatisfied with our response to you.
             </p>
            */}

            <p>This statement was created on {lastUpdated}.</p>
        </div>
    );
}
