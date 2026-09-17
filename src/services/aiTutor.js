/**
 * AI Tutor Service Abstraction
 * 
 * Provides a clean interface for AI tutor integration.
 * The application works 100% without any AI provider configured.
 * To connect an AI tutor, create an implementation of this interface
 * and provide it to the AITutorProvider.
 */

/**
 * @typedef {Object} TutorContext
 * @property {string} currentModule - Module ID
 * @property {string} currentLesson - Lesson ID
 * @property {Object} simulationState - Current simulation state
 * @property {string} question - Student's question
 */

/**
 * @typedef {Object} TutorResponse
 * @property {string} answer - AI response text
 * @property {string[]} suggestions - Follow-up suggestions
 */

class AITutorService {
  constructor(config = {}) {
    this.provider = config.provider || null;
    this.endpoint = config.endpoint || null;
    this.model = config.model || null;
    this._available = false;
  }

  /**
   * Check if the AI tutor is available
   * @returns {boolean}
   */
  isAvailable() {
    return this._available && this.provider !== null;
  }

  /**
   * Initialize the AI tutor connection
   * @param {Object} config - Provider configuration
   * @returns {Promise<boolean>} Whether initialization succeeded
   */
  async initialize(config) {
    try {
      this.provider = config.provider;
      this.endpoint = config.endpoint;
      this.model = config.model;
      // Attempt a health check
      this._available = true;
      return true;
    } catch {
      this._available = false;
      return false;
    }
  }

  /**
   * Ask the AI tutor a question with educational context
   * @param {TutorContext} context - Current learning context
   * @returns {Promise<TutorResponse>}
   */
  async askQuestion(context) {
    if (!this.isAvailable()) {
      return {
        answer: 'AI Tutor is not connected. You can continue learning normally using the interactive simulations and lessons.',
        suggestions: [
          'Try the interactive simulation',
          'Review the lesson content',
          'Attempt a practice problem',
        ],
      };
    }

    // When a provider is configured, this would call the API
    // The implementation depends on the specific provider
    try {
      const response = await this._callProvider(context);
      return response;
    } catch {
      return {
        answer: 'Unable to reach the AI Tutor right now. Please try again later.',
        suggestions: ['Continue with the lesson', 'Try a practice problem'],
      };
    }
  }

  /**
   * Internal method to call the AI provider
   * Override this for specific provider implementations
   */
  async _callProvider(_context) {
    // Placeholder for actual API call
    throw new Error('No AI provider configured');
  }

  /**
   * Disconnect the AI tutor
   */
  disconnect() {
    this.provider = null;
    this.endpoint = null;
    this.model = null;
    this._available = false;
  }
}

// Singleton instance
const aiTutor = new AITutorService();

export default aiTutor;
export { AITutorService };
