import { Scheme } from "@/src/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import { CheckCircle2, Info, ArrowRight } from "lucide-react";

interface SchemeCardProps {
  scheme: Scheme;
  index: number;
}

export function SchemeCard({ scheme, index }: SchemeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300 border-none bg-white">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2 mb-2">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none">
              {scheme.category}
            </Badge>
          </div>
          <CardTitle className="text-xl font-bold leading-tight text-slate-900">
            {scheme.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            {scheme.description}
          </p>
          
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Eligibility
            </h4>
            <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
              "{scheme.eligibilityExplanation}"
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Info className="w-3 h-3 text-blue-500" />
              Key Benefits
            </h4>
            <p className="text-sm text-slate-700">
              {scheme.benefits}
            </p>
          </div>

          <Separator className="bg-slate-100" />

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Application Steps
            </h4>
            <ul className="space-y-2">
              {scheme.applicationSteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <button className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 py-2 transition-colors">
            View Official Portal
            <ArrowRight className="w-4 h-4" />
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
