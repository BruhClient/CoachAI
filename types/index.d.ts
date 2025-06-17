interface CompanionComponentProps {
  companionId: string;
  subject: string;
  topic: string;
  name: string;
  userName: string;
  userImage: string;
  voice: string;
  style: string;
  duration: number;
  userSeconds: number;
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}
