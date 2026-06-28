/**
 * PromptSuggestions — animated suggestion chips for common workflow ideas.
 */

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../animations/variants';

const suggestions = [
  'When a customer fills my contact form, save to Sheets and send me an email',
  'Every hour, fetch data from an API and store it in my database',
  'When I receive a webhook, send a notification to Slack',
  'Process support emails: if urgent, send priority reply',
  'When a new user signs up, add to CRM and send welcome email',
  'Monitor website uptime and alert me on Slack if it goes down',
];

export default function PromptSuggestions({ onSelect }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-wrap gap-2 justify-center"
    >
      {suggestions.map((text) => (
        <motion.button
          key={text}
          variants={staggerItem}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(text)}
          className="
            px-3 py-1.5 text-xs text-text-secondary
            bg-surface-tertiary/50 border border-border-primary
            rounded-[var(--radius-full)]
            hover:text-text-primary hover:border-border-secondary hover:bg-surface-hover
            transition-colors duration-150 cursor-pointer
            max-w-[280px] truncate
          "
        >
          {text}
        </motion.button>
      ))}
    </motion.div>
  );
}
