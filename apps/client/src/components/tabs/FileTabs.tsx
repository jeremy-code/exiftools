import { useRef, type ReactNode } from "react";

import { Plus } from "lucide-react";
import { DropZone } from "react-aria-components";
import { useShallow } from "zustand/react/shallow";

import { SortableList } from "#components/dnd/SortableList";
import { useFileTabsStore } from "#hooks/useFileTabsStore";
import { Button } from "@exifi/ui/components/Button";
import {
  Tabs,
  TabList,
  type TabsProps,
  TabPanels,
} from "@exifi/ui/components/Tabs";

import { FileTab } from "./FileTab";
import { FileTabPanel } from "./FileTabPanel";

type FileTabsProps = {
  children?: ReactNode;
} & TabsProps;

const FileTabs = ({ children, ...props }: FileTabsProps) => {
  const {
    tabs,
    activeTabId,
    setActiveTabId,
    removeTab,
    createNewTab,
    createNewTabs,
    updateTab,
    reorderTabs,
  } = useFileTabsStore(
    useShallow((state) => ({
      tabs: state.tabs,
      activeTabId: state.activeTabId,
      setActiveTabId: state.setActiveTabId,
      removeTab: state.removeTab,
      createNewTab: state.createNewTab,
      createNewTabs: state.createNewTabs,
      updateTab: state.updateTab,
      reorderTabs: state.reorderTabs,
    })),
  );
  const fileTabsListRef = useRef<HTMLDivElement>(null);

  return (
    <SortableList
      containerRef={fileTabsListRef}
      onSortEnd={({ initialIndex, index }) => reorderTabs(initialIndex, index)}
    >
      <Tabs
        {...props}
        keyboardActivation="manual"
        selectedKey={activeTabId}
        onSelectionChange={(id) =>
          typeof id === "string" ? setActiveTabId(id) : undefined
        }
      >
        {/* Offset by height of Navbar */}
        <div className="sticky top-[--spacing(20)] z-50 container p-4">
          <DropZone
            onDrop={async (event) => {
              const files = await Promise.all(
                event.items
                  .filter((item) => item.kind === "file")
                  .map((item) => item.getFile()),
              );

              createNewTabs(files);
            }}
          >
            <div className="grid grid-cols-[1fr_auto] items-center gap-1 overflow-x-auto rounded-md border border-border bg-bg-muted shadow [scrollbar-width:thin]">
              <TabList
                ref={fileTabsListRef}
                fitted
                className="gap-1"
                variant="enclosed"
              >
                {tabs.map((tab, index) => (
                  <FileTab
                    key={tab.id}
                    id={tab.id}
                    index={index}
                    file={tab.file}
                    removeTab={() => removeTab(tab.id)}
                  />
                ))}
              </TabList>
              <div className="sticky top-0 right-1">
                <Button
                  className="text-fg-muted"
                  size="icon"
                  variant="muted"
                  onPress={() => createNewTab()}
                  aria-label="New tab"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </DropZone>
        </div>
        <TabPanels>
          {tabs.map((tab) => (
            <FileTabPanel
              className="container pt-0 pb-8"
              key={tab.id}
              id={tab.id}
              file={tab.file}
              updateFile={(file) => updateTab(file, tab.id)}
              uploadFiles={createNewTabs}
            >
              {children}
            </FileTabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </SortableList>
  );
};

export { FileTabs };
