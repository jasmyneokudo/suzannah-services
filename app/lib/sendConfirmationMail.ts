export async function sendConfirmationEmail(
  clientEmail: string,
  clientName: string,
  serviceType: string,
  paymentPlan: string,
) {
  console.log("client email", clientEmail);
  const response = await fetch("/api/sendEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: clientEmail,
      name: clientName,
      subject: "Domestic Service Booking Confirmation",
      html: `
    <div>
    <h4>Good day Sir/Madam ${clientName}</h4>
    <p>
Thank you for choosing Suzannah Home & Care Services.
We have successfully received your booking request for our <strong>${serviceType}</strong> service.
A member of our team will contact you on WhatsApp shortly to confirm the details and guide you through the next steps.
</p>
    
    ${
      paymentPlan === "monthly"
        ? `<p>Here is also a copy of the <strong>Customer Service Policy</strong> for our <strong>Monthly management plan</strong> which you selected</p>
      <section class="customer-policy">
  <h2>Monthly Management Plan Policy</h2>



  <h3>1. Performance Monitoring</h3>

  <ul>
    <li>
      We periodically request feedback to ensure you are satisfied with the
      service provided.
    </li>
    <li>
      Your feedback helps us maintain high service standards and address any
      concerns before they become larger issues.
    </li>
    <li>
      We encourage clients to report performance concerns as soon as they arise
      so appropriate action can be taken.
    </li>
  </ul>
    <hr />


  <h3>2. Monthly Payments</h3>

  <ul>
    <li>
      All monthly service payments must be made directly to Suzannah Home &amp;
      Care Services at the end of each month.
    </li>
    <li>
      Clients should not make salary payments, or other employment
      payments directly to staff unless expressly authorized by the company.
    </li>
    <li>
      The monthly fee is a managed service fee and is not equivalent to the
      domestic staff's salary.
    </li>
  </ul>

  <hr />

  <h3>3. Staff Management</h3>

  <ul>
    <li>
      All matters relating to salaries, employment terms, disciplinary actions, benefits, and other employment arrangements are handled solely by
      Suzannah Home &amp; Care Services.
    </li>
    <li>
      We kindly request that clients do not discuss salary, employment
      conditions, or other internal company matters directly with staff members.
    </li>
    <li>
      If you have any concerns regarding your assigned staff, please contact us
      immediately. Our team will investigate and resolve the matter promptly and
      professionally.
    </li>
  </ul>

  <hr />

  <h3>4. Replacement Policy</h3>

  <ul>
    <li>
      If a replacement becomes necessary due to resignation, poor performance,
      misconduct, or any other valid reason, Suzannah Home &amp; Care Services
      will arrange a suitable replacement as quickly as possible, subject to
      candidate availability.
    </li>
    <li>
      Replacement decisions are made at the company's discretion after reviewing
      the circumstances surrounding each case.
    </li>
  </ul>

  <hr />

  <h3>5. Staff Welfare &amp; Off-Days</h3>

  <ul>
    <li>
      Our standard off-day for live-in staff is the last weekend of every month.
    </li>
    <li>
      Off-day arrangements may be adjusted based on the client's household
      requirements and mutual agreement with the domestic staff.
    </li>
  </ul>

  <hr />

  <h3>6. Professional Conduct</h3>

  <ul>
    <li>
      Clients are expected to provide a safe, respectful, and professional
      working environment for assigned staff.
    </li>
    <li>
      Likewise, Suzannah Home &amp; Care Services is committed to ensuring that
      all staff conduct themselves professionally and uphold the company's
      standards while serving clients.
    </li>
  </ul>
</section>`
        : `<p>Here is also a copy of the <strong>Customer Service Policy</strong> for our <strong>One-off payment plan</strong> which you selected</p>
      <section class="customer-policy">
  <h2>One-Off Payment Plan Policy</h2>

  <h3>1. Salary Agreement</h3>
  <p>
    Clients are responsible for discussing and agreeing on the monthly salary
    directly with their chosen domestic staff before employment begins.
  </p>

  <p><strong>Minimum Recommended Monthly Salaries</strong></p>

  <ul>
    <li>
      <strong>Nannies, Helps &amp; Housekeepers</strong>
      <ul>
        <li>Live-in: From ₦70,000/month</li>
        <li>Live-out: From ₦100,000/month</li>
      </ul>
    </li>

    <li>
      <strong>Cooks</strong>
      <ul>
        <li>Live-in: From ₦160,000/month</li>
        <li>Live-out: From ₦200,000/month</li>
      </ul>
    </li>

    <li>
      <strong>Drivers</strong>
      <ul>
        <li>Live-in: From ₦150,000/month</li>
        <li>Live-out: From ₦170,000/month</li>
      </ul>
    </li>

    <li>
      <strong>Elder Caregivers</strong>
      <ul>
        <li>Live-in: From ₦180,000/month</li>
        <li>Live-out: From ₦200,000/month</li>
      </ul>
    </li>
  </ul>

  <p>
    These are minimum recommended salaries. Clients may offer higher salaries
    based on the candidate's experience, qualifications, responsibilities, and
    working conditions.
  </p>

  <hr />

  <h3>2. Replacement Policy</h3>

  <p>
    Your one-off placement fee includes <strong>one (1) free replacement</strong>,
    provided the replacement request is made within
    <strong>two (2) months</strong> from the candidate's initial placement date.
  </p>

  <h4>A replacement may be approved if:</h4>

  <ul>
    <li>The domestic staff voluntarily resigns.</li>
    <li>The domestic staff absconds or abandons the job without reasonable notice.</li>
    <li>
      The domestic staff is consistently unable to perform the duties agreed upon
      during placement.
    </li>
    <li>
      The domestic staff engages in proven misconduct, including dishonesty,
      theft, violence, abuse, or any behaviour that poses a risk to members of
      the household.
    </li>
  </ul>

  <h4>A replacement will not be approved if:</h4>

  <ul>
    <li>The client changes their mind or no longer requires domestic staff.</li>
    <li>
      The client assigns duties that were not disclosed during the recruitment
      process.
    </li>
    <li>
      The domestic staff resigns due to non-payment or delayed payment of salary.
    </li>
    <li>
      The domestic staff resigns because of abuse, harassment, unsafe working
      conditions, or repeated violation of the agreed employment terms.
    </li>
    <li>
      The client requests a replacement based on discrimination relating to
      ethnicity, religion, tribe, nationality, age, or other protected
      characteristics.
    </li>
    <li>
      The client and domestic staff mutually agree to end the employment for
      reasons unrelated to the candidate's performance.
    </li>
  </ul>

  <hr />

  <h3>3. Replacement Process</h3>

  <p>
    To request a replacement, the client must notify Suzannah Home &amp; Care
    Services as soon as possible and provide a clear explanation of the issue.
  </p>

  <p>
    Our team will review the circumstances, speak with both the client and the
    domestic staff where necessary, and determine whether the request qualifies
    under this policy.
  </p>

  <p>
    Approved replacements will be processed as quickly as possible, subject to
    the availability of suitable candidates.
  </p>

  <hr />

  <h3>4. Replacement After Two Months</h3>

  <p>
    Replacement requests made after the two-month replacement period will be
    treated as a new placement and will attract the applicable placement fee.
  </p>
</section>
            
            `
    }

    <p>
  By engaging the services of Suzannah Home &amp; Care Services, you confirm that you have
  read, understood, and agreed to be bound by these Terms and Customer Policies.
  These terms form part of the service agreement between you and Suzannah Home
  &amp; Care Services.
</p>
    <p><strong>Thank you for booking with us, Suzannah Home & Care Services remains committed to providing you peace of mind and domestic excellence through our exceptional domestic services.</p>
            
            </strong></div>`,
    }),
  });

  await response.json();
}