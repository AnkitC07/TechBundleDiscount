import React from "react";

export const AppFooter = () => {
    return (
        <section class="footer_section">
            <div class="footer_div flex text-center justify-evenly p-16">
                <span class="text-2xl">
                    Need Help?{" "}
                    <a href="https://cancode.tawk.help/" target="_blank">
                        FAQ
                    </a>{" "}
                    |{" "}
                    <a href="https://www.cancode.io/privacy-policy" target="_blank">
                        Privacy Policy
                    </a>{" "}
                    |{" "}
                    <a href="https://www.cancode.io/" target="_blank">
                        Learn more about CanCode.io
                    </a>
                </span>
            </div>
            <a
                href="https://rswd-app.myshopify.com/admin/apps/50853ac9f9e1ef9bad9504b267cce2d1/plan.php?oauth_token=shpua_e830f236c8b81120d6c8ecc6f2adf0a8&amp;shop=rswd-app.myshopify.com"
                id="plan_check_url"
            ></a>
        </section>
    );
};