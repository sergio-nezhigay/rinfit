/**
 * privy-chat-subscribe.js
 *
 * Bridges the AI chat widget and Privy email marketing.
 * Renders a Privy embed form (campaign 4622435) inside a hidden container,
 * then exposes window.privyChatSubscribe(email) for the chat widget to call.
 * The customer is subscribed silently — no popup, no visual change.
 */
(function () {
  /**
   * Wait for the Privy Embedder SDK to be ready, then:
   *   1. Mount the hidden embed form into #privy-chat-embed.
   *   2. Expose privyChatSubscribe(email) globally so the chat widget
   *      can trigger a subscription without any visible UI.
   */
  function init() {
    if (!window.Privy || !window.Privy.Embedder) {
      return setTimeout(init, 300);
    }

    // Mount the Privy campaign form inside the off-screen container.
    new window.Privy.Embedder({
      campaignId: 4622435,
      container: document.getElementById('privy-chat-embed'),
    });

    /**
     * Called by the AI chat widget after the customer provides their email.
     * Fills the hidden Privy form and submits it to trigger the
     * WELCOME10 automation without opening a visible popup.
     *
     * @param {string} email - Customer email collected by the chat widget.
     */
    window.privyChatSubscribe = function (email) {
      var container = document.getElementById('privy-chat-embed');
      var input = container && container.querySelector('input[type="email"]');

      if (!input) return;

      input.value = email;
      input.dispatchEvent(new Event('input', { bubbles: true }));

      var btn = container.querySelector('button[type="submit"], input[type="submit"]');
      if (btn) btn.click();
    };
  }

  init();
})();
