import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setSearchQuery, setFilterPlan, setCurrentPage } from "./adminSlice";

const AdminUsers = () => {
  const dispatch = useAppDispatch();
  const { users, searchQuery, filterPlan, currentPage, usersPerPage } = useAppSelector((s) => s.admin);

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPlan = filterPlan === "all" || u.plan === filterPlan;
    return matchSearch && matchPlan;
  });

  const totalPages = Math.ceil(filtered.length / usersPerPage);
  const paginated = filtered.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">User Management</CardTitle>
          <div className="flex gap-3 mt-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-10" value={searchQuery} onChange={(e) => dispatch(setSearchQuery(e.target.value))} />
            </div>
            <Select value={filterPlan} onValueChange={(v) => dispatch(setFilterPlan(v))}>
              <SelectTrigger className="w-32"><SelectValue placeholder="Plan" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Family">Family</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Goal</TableHead>
                <TableHead>Streak</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">{u.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{u.email}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{u.plan}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{u.goal}</TableCell>
                  <TableCell className="font-mono text-sm">{u.streak} days</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{u.joined}</TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${u.status === "active" ? "bg-primary/15 text-primary border-0" : "bg-destructive/15 text-destructive border-0"}`}>{u.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-xs">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">Showing {(currentPage - 1) * usersPerPage + 1}-{Math.min(currentPage * usersPerPage, filtered.length)} of {filtered.length}</p>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage === 1} onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button key={i + 1} variant={currentPage === i + 1 ? "default" : "outline"} size="icon" className="h-8 w-8" onClick={() => dispatch(setCurrentPage(i + 1))}>
                  {i + 1}
                </Button>
              ))}
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage === totalPages} onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
