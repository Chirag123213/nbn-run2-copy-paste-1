# Trial Two — ChatGPT Token Usage Report

## 1. Overview

This report provides an estimated token usage breakdown for the Technician Dispatch implementation completed using ChatGPT.

The analysis was performed using six JSON files exported from the ChatGPT conversation through Chrome Developer Tools.

| Field | Details |
|---|---|
| AI tool | ChatGPT |
| Model | GPT-5.6 Thinking |
| Feature | Technician Dispatch |
| Build method | Copy-and-paste |
| Measurement method | Exported conversation JSON |
| Token estimation | Approximately 4 characters per token |

## 2. Visible Conversation Token Usage

| Category | Estimated Tokens |
|---|---:|
| User prompts | 5,502 |
| Assistant final responses | 17,230 |
| Other visible assistant text | 611 |
| **Total visible conversation** | **23,343** |

### Message Counts

| Category | Count |
|---|---:|
| User messages | 13 |
| Assistant final responses | 13 |

The visible conversation generated approximately **23,343 tokens**, representing user prompts, assistant responses and visible progress messages.

## 3. Tool Activity Token Usage

The exported conversation JSON also captured tool calls and their corresponding execution responses.

| Category | Estimated Tokens |
|---|---:|
| Assistant tool-call text | 15,450 |
| Tool response text | 68,021 |
| **Total tool activity** | **83,471** |

Tool activity includes commands, code execution requests, execution outputs and other tool-generated text captured during the implementation.

## 4. Combined Token Usage

| Category | Estimated Tokens |
|---|---:|
| User prompts | 5,502 |
| Assistant final responses | 17,230 |
| Other visible assistant text | 611 |
| Assistant tool-call text | 15,450 |
| Tool response text | 68,021 |
| **Overall estimated total** | **106,814** |

### Token Distribution

| Measurement | Estimated Tokens |
|---|---:|
| Visible conversation | 23,343 |
| Tool activity | 83,471 |
| **Combined total** | **106,814** |

The combined transcript contains approximately **106,814 estimated tokens**, including both conversational interactions and captured tool activity.

## 5. Interpretation of Results

Two token usage measurements were calculated to distinguish conversational AI interaction from the broader implementation workflow.

**Visible conversation tokens (23,343)** represent the interaction between the developer and ChatGPT, including user prompts, assistant responses and visible progress messages.

**Combined transcript tokens (106,814)** include the visible conversation together with tool calls and tool responses captured during implementation.

The combined measurement provides a broader representation of the text recorded during the AI-assisted development process.

## 6. Measurement Methodology

Token usage was estimated using the following process:

1. Export conversation data as JSON using Chrome Developer Tools.
2. Combine the six exported JSON files.
3. Identify unique conversation messages to prevent duplicate counting.
4. Categorise messages into user prompts, assistant responses, intermediate assistant text, tool calls and tool responses.
5. Extract the text content from each category.
6. Estimate token usage using approximately four characters per token.
7. Aggregate estimated token counts by category.

## 7. Limitations

The calculated token counts are estimates rather than exact model usage measurements.

- Token counts were estimated using a character-based approximation rather than the model's tokenizer.
- Hidden reasoning tokens are not fully represented in the exported data.
- Image and multimodal processing costs cannot be accurately calculated from text alone.
- System instructions and other internal context may contribute additional token usage.
- Repeated conversation context across model requests may increase actual input token usage.
- Captured tool activity does not necessarily correspond directly to model-billed tokens.

Therefore, these results should be interpreted as **estimated transcript token usage**, rather than verified API usage or billing data.

## 8. Summary

| Metric | Result |
|---|---:|
| User messages | 13 |
| Assistant final responses | 13 |
| User prompt tokens | 5,502 |
| Assistant response and visible progress tokens | 17,841 |
| **Visible conversation tokens** | **23,343** |
| Captured tool activity tokens | 83,471 |
| **Combined estimated tokens** | **106,814** |

The Technician Dispatch implementation recorded approximately **23,343 visible conversation tokens** and **106,814 combined transcript tokens**, including captured tool activity.

These measurements provide a consistent estimated token usage record for evaluating the ChatGPT copy-and-paste development method in Trial Two.