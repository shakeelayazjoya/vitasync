import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addMessage, setTyping, incrementUsage } from "./coachSlice";
import { useAuth } from "@/hooks/useAuth";

const mockResponses = [
  "Based on your recent meals, you're consuming a lot of refined carbs in the evening. Try switching dinner roti with whole wheat alternatives!",
  "Your energy dips around 3 PM could be linked to your heavy lunch. Consider splitting it into two smaller meals.",
  "Great progress! You've maintained your protein target for 5 days straight. Keep it up! 💪",
];

const AiCoachPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { messages, isTyping, messagesUsed, dailyLimit } = useAppSelector((s) => s.coach);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPro = user?.plan === "Pro" || user?.plan === "Family";
  const isLimited = !isPro && messagesUsed >= dailyLimit;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isLimited) return;
    const userMsg = { id: `u-${Date.now()}`, role: "user" as const, text: input, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    dispatch(addMessage(userMsg));
    dispatch(incrementUsage());
    setInput("");
    dispatch(setTyping(true));

    setTimeout(() => {
      dispatch(setTyping(false));
      const aiText = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      dispatch(addMessage({ id: `ai-${Date.now()}`, role: "ai", text: aiText, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }));
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px-48px)] py-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-accent/15 rounded-xl flex items-center justify-center">
            <Bot className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">VitaSync AI Coach</h2>
            <Badge variant="outline" className="text-[10px] border-accent/30 text-accent">Powered by AI</Badge>
          </div>
        </div>
        {!isPro && (
          <Badge variant="outline" className="border-warning/40 text-warning">
            {messagesUsed}/{dailyLimit} free messages
          </Badge>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "ai" && (
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-accent/15 text-accent text-xs">AI</AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-card border border-accent/20 text-foreground rounded-bl-md"
            }`}>
              {msg.text}
              <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.timestamp}</p>
            </div>
            {msg.role === "user" && (
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary/15 text-primary text-xs">
                  {user?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-accent/15 text-accent text-xs">AI</AvatarFallback>
            </Avatar>
            <div className="bg-card border border-accent/20 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
              <span className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Limit overlay */}
      {isLimited && (
        <Card className="p-4 mb-3 border-warning/30 bg-warning/5 flex items-center gap-3">
          <Lock className="h-5 w-5 text-warning shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Daily limit reached</p>
            <p className="text-xs text-muted-foreground">Upgrade to Pro for unlimited AI coaching</p>
          </div>
          <Button size="sm" className="bg-warning text-warning-foreground hover:bg-warning/90">Upgrade</Button>
        </Card>
      )}

      {/* Input */}
      <div className="flex gap-2 pt-3 border-t border-border">
        <Input
          placeholder={isLimited ? "Upgrade to continue..." : "Ask your AI coach..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isLimited}
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={!input.trim() || isLimited}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AiCoachPage;
