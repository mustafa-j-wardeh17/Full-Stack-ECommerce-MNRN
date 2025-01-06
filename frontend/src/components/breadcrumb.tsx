import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define the type for breadcrumb paths
type BreadcrumbPath = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  paths: BreadcrumbPath[];
};

export function BreadcrumbWithCustomSeparator({ paths }: BreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;

          return (
            <div key={path.label} className="flex items-center gap-2">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{path.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={path.href || "#"}>{path.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {/* Add Separator except for the last item */}
              {!isLast && (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
